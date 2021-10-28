
import { useAuthUser, withAuthUser, withAuthUserTokenSSR, AuthAction } from 'next-firebase-auth';
import { getFirebaseAdmin } from 'next-firebase-auth';
import React, { useState, useEffect } from 'react'
import firebase from 'firebase/app';
import 'firebase/firestore';

import {
  Container,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Text,
  IconButton,
  Divider,
  List,
  ListItem,
  Stack
} from "@chakra-ui/react"
import Header from '../../components/Header'
import { AddIcon, DeleteIcon, StarIcon, PhoneIcon, EditIcon, CalendarIcon } from "@chakra-ui/icons"

const SingleEvent = ({itemData}) => {
const AuthUser = useAuthUser();
const [inputFirstName, setFirstName] = useState('')
const [inputLastName, setLastName] = useState('')
const [inputPhoneNumber, setPhoneNumber] = useState('')
const [inputBirthdate, setBirthdate] = useState('')
const [contacts, setContacts] = useState([])
return (

     <Container maxWidth="container.xl" alignItems="center" py={[0, 10, 20]}>
        <Header email={AuthUser.email} signOut={AuthUser.signOut} />
        <Flex h={{base: 'auto',  sm: 'auto', md:'auto'}} justifyContent="space-between" alignItems="center"direction={{base: 'column-reverse', md: 'row'}}>
                          <Flex align="center">
                            
                              <List  style={{ marginLeft: '.5rem' }}>
                                <ListItem fontSize={{ base: "18px", md: "20px", lg: "30px" }}>
                                
                                  
                                    {itemData?.name}
                                </ListItem>
                                <ListItem fontSize={{ base: "18px", md: "20px", lg: "30px" }}>
                                
                                  
                                    {itemData?.last}
                                </ListItem>
                                <ListItem fontSize={{ base: "18px", md: "20px", lg: "30px" }}>
                                
                                  
                                    {itemData?.number}
                                </ListItem>
                                <ListItem fontSize={{ base: "18px", md: "20px", lg: "30px" }}>
                                
                                  
                                    {itemData?.birthdate}
                                </ListItem>
                            </List>
                          </Flex>
        <Stack width={{base: 'auto', sm: 'auto', md: 'auto'}}  pb={7} justifyContent="space-between"  spacing={4} direction={{base: 'column', md: 'row', sm:'column'}} alignItems="center">
            <AddIcon color="gray.300" />
            <Input fontSize={{ base: "14px", md: "18px", lg: "20px" }} variant="flushed" type="first_name" value={inputFirstName} onChange={(e) => setFirstName(e.target.value)} placeholder="What's da first name?" />
                <Input  fontSize={{ base: "14px", md: "18px", lg: "20px" }} variant="flushed" type="last_name" value={inputLastName} onChange={(e) => setLastName(e.target.value)} placeholder="What's da last name?" />
                <Input fontSize={{ base: "14px", md: "18px", lg: "20px" }}  variant="flushed" type="phone_number" value={inputPhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="What's da phone number?" />
                <Input variant="flushed" type="date" value={inputBirthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="When's the birthday?"/>
              <Button
                  ml={12}
                  style={{ marginLeft: '.5rem' }}
              >
                  Update!
              </Button>
          </Stack>
          </Flex>

    </Container>

);
};
export const getServerSideProps = withAuthUserTokenSSR ({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
  })(
    async ({ AuthUser, params }) => {
    // take this is id parameter from the url and construct a db query with it
    const db = getFirebaseAdmin().firestore();
    const doc = await db.collection("my_contacts").doc(params.id).get();
    let itemData;
    
    if (!doc.empty) {
      let docData = doc.data();
      itemData = {
        id: doc.id,
        name: docData.first_name,
        last: docData.last_name,
        number: docData.number,
        birthdate: docData.date.toDate().toDateString()
   
      };
    } else {
      // no document found
      itemData = null;
    }
    
    // return the data
    return {
      props: {
        itemData
      }
    }
  }
)

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN
  })(SingleEvent)

  // Thank you Professor for your tutorial!