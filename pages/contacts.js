import React, { useState, useEffect } from 'react'

// All credits to: https://github.com/alampros/react-confetti for Confetti Effect on Popover
import Confetti from 'react-confetti'
import  FocusLock from "react-focus-lock"

import {
    Container,
    Flex,
    Heading,
    Popover,
    PopoverTrigger,
    Link,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverForm,
    PopoverCloseButton,
    Input,
    Button,
    Text,
    IconButton,
    Divider, 
    List, 
    ListItem, 
    Stack
} from "@chakra-ui/react"
import DarkModeSwitch from '../components/DarkModeSwitch'
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
} from 'next-firebase-auth'
import { AddIcon, DeleteIcon, StarIcon, PhoneIcon, EditIcon } from "@chakra-ui/icons"
import firebase from 'firebase/app'
import 'firebase/firestore'
import Header from '../components/Header'


const Contact = () => {
    const AuthUser = useAuthUser()
    const [inputFirstName, setFirstName] = useState('')
    const [inputLastName, setLastName] = useState('')
    const [inputPhoneNumber, setPhoneNumber] = useState('')
    const [inputBirthdate, setBirthdate] = useState('')
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        AuthUser.id &&
            firebase
                .firestore()
                .collection("my_contacts")
                .where('user', '==', AuthUser.id)
                .onSnapshot(
                  snapshot => {
                    setContacts(snapshot.docs.map(
                      doc => {
                        return {
                          contactID: doc.id, 
                          contactFirstName: doc.data().first_name,
                          contactLastName: doc.data().last_name,
                          contactPhoneNumber: doc.data().number,
                          contactBirthdate: doc.data().date.toDate().toDateString()
                      
                        }
                      }
                      
                )
    );
                  }
                )
    })


    

    const sendData = () => {
        try {
            // try to update doc
            firebase
                .firestore()
                .collection("my_contacts") // all users will share one collection 
                .add({
                    first_name: inputFirstName,
                    last_name: inputLastName,
                    number: inputPhoneNumber,
                    date: firebase.firestore.Timestamp.fromDate( new Date(inputBirthdate) ),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: AuthUser.id
                })
                .then(console.log('Praise the Lord! Contact was successfully sent to the Firestore!'));
              // flesh out user-entered values in the input elements 
              setFirstName('');
              setLastName('');
              setPhoneNumber('');
              setBirthdate('');
                

        } catch (error) {
            console.log(error)
        }
    }
    // All credits to PedroTech: https://github.com/machadop1407/firebase-react-crud/blob/main/src/App.js
    // const updateUser = async (id, age) => {
    // const userDoc = doc(db, "users", id);
    // const newFields = { age: age + 1 };
    // await updateDoc(userDoc, newFields);
    // };
    
    const updateContact = async (t, contactFirstName, contactLastName, contactPhoneNumber, contactBirthdate) => {
      try {
        const editContact = {contactFirstName: setFirstName, contactLastName: setLastName, contactLastName: setPhoneNumber, contactBirthdate: setBirthdate}
        firebase
          .firestore()
          .collection("my_contacts")
          .doc(t)
          .update(editContact)
          .then(console.log("Praise the Lord! Contact was successfully updated."))
      } catch(error) {
        console.log(error)
      }
    }


    const deleteContact = (t) => {
        try {
            firebase
                .firestore()
                .collection("my_contacts")
                .doc(t)
                .delete()
                .then(console.log('Praise the Lord! Contact was successfully deleted! '))
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
      <Container maxWidth="container.xl" alignItems="center" py={[0, 10, 20]}>
          <Header email={AuthUser.email} signOut={AuthUser.signOut} />
          <Flex h={{base: 'auto',  sm: 'auto', md:'auto'}} justifyContent="space-between" alignItems="center"direction={{base: 'column-reverse', md: 'row'}}>
          
               
                <Heading p={7} bgGradient="linear(to-l, #575aff, #c7f8ff)"
    bgClip="text" align="center" fontSize={{ base: "20px", md: "30px", lg: "70px" }}>Nice to see you here, {AuthUser.email}!</Heading>
                    <Flex p={7} alignItems="center">
                        <DarkModeSwitch />
                        <IconButton ml={2} onClick={AuthUser.signOut} icon={<StarIcon />} />
                    </Flex>
                </Flex>
  
   
                <Stack width={{base: 'auto', sm: 'auto', md: 'auto'}}  pb={7} justifyContent="space-between"  spacing={4} direction={{base: 'column', md: 'row', sm:'column'}} alignItems="center">
                <AddIcon color="gray.300" />
              
                 <Input fontSize={{ base: "14px", md: "18px", lg: "20px" }} variant="flushed" type="first_name" value={inputFirstName} onChange={(e) => setFirstName(e.target.value)} placeholder="What's da first name?" />
                <Input  fontSize={{ base: "14px", md: "18px", lg: "20px" }} variant="flushed" type="last_name" value={inputLastName} onChange={(e) => setLastName(e.target.value)} placeholder="What's da last name?" />
                <Input fontSize={{ base: "14px", md: "18px", lg: "20px" }}  variant="flushed" type="phone_number" value={inputPhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="What's da phone number?" />
                <Input variant="flushed" type="date" value={inputBirthdate} onChange={(e) => setBirthdate(e.target.value)} placeholder="When's da birthday?"/>
                <Button
                      ml={12}
                      onClick={() => sendData()} style={{ marginLeft: '.5rem' }}
                  >
                      Add!
                  </Button>
              
                  
          
              </Stack>
  
              {contacts.map((item, i) => {
                  return (
                      <React.Fragment  key={i}>
                          {i > 0 && <Divider />}
                          <Flex
                              h={{base: 'auto', md:'auto'}} alignItems="center" direction={{base: 'column-reverse', md: 'row'}}
                          >
                              <Flex align="center">
                                <Text fontSize={{ base: "18px", md: "20px", lg: "30px" }} mr={4} bgGradient="linear(to-r, #575aff, #c7f8ff)"
                                    bgClip="text"  >{i + 1}.</Text>
                                   <List  spacing={3} py={4} >
                                   <ListItem fontSize={{ base: "14px", md: "20px", lg: "30px" }}>
                                    <StarIcon style={{ marginInlineEnd: '.5rem' }} />
                                      {item?.contactFirstName}
                                  </ListItem>
                                  
                                  <ListItem fontSize={{ base: "14px", md: "20px", lg: "30px" }}>
                                    <StarIcon style={{ marginInlineEnd: '.5rem' }}  />
                                      {item?.contactLastName}
                                  </ListItem>
                                  <ListItem fontSize={{ base: "14px", md: "20px", lg: "30px" }}>
                                    <PhoneIcon style={{ marginInlineEnd: '.5rem' }} />
                                      {item?.contactPhoneNumber}
                                  </ListItem>
                                
                              </List>
                                 
                                    
                              <Stack width={{base: 'auto', sm: 'auto', md: 'auto'}}  pb={7} justifyContent="space-between"  spacing={4} direction={{base: 'column', md: 'row', sm:'column'}} alignItems="center">
                
                                <Popover>
                                      <PopoverTrigger>
                                        <Button>Click Me!</Button>
                                      </PopoverTrigger>
                                      <Stack>
                                        <PopoverContent>
                                          <PopoverArrow />
                                          
                                          <Confetti
                                         width="full" height="full"
                                        />
                                          <PopoverHeader>My birthday is: {item?.contactBirthdate}</PopoverHeader>
                                          <PopoverCloseButton />
                                          <PopoverBody>
                                            <Link href={"tel:+" + item?.contactPhoneNumber} textDecoration="none">
                                         
                                          <Button leftIcon={<PhoneIcon />} color="white"
                                            fontWeight="bold"
                                            variant="outline"
                                            py={17}
                                            borderRadius="md"
                                            textDecoration="none"
                                            bgGradient="linear(to-r, #575aff, #575aff)"
                                            _hover={{
                                              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
                                            }}  >
                                          Call me
                                        </Button>
                                       
                                        </Link>
                                          </PopoverBody>
                                          <PopoverFooter>copyright 2021</PopoverFooter>
                                        </PopoverContent>
                                      </Stack>
                                  </Popover>
                              
                                  <Link href={"/contacts/" + item.contactID}>
                              <EditIcon />
                            </Link>
                           
                                  <IconButton  ml={2} onClick={() => deleteContact(item.contactID)} icon={<DeleteIcon />} />
                              </Stack>
                          </Flex>
                          </Flex>
                          </React.Fragment>
                )
            })}
        
      </Container>
    )
}

// All credits to Pedro Henrique Machado 
// https://github.com/machadop1407/firebase-react-crud/blob/main/src/App.js
// <button
             // onClick={() => {
              //  updateUser(user.id, user.age);

export const getServerSideProps = withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser, req }) => {
    return {
        props: {
           
      }
    }
})

export default withAuthUser({
    whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
    whenUnauthedBeforeInit: AuthAction.REDIRECT_TO_LOGIN,
})(Contact)
