import React, { useState, useEffect } from 'react'
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
import DarkModeSwitch from '../components/DarkModeSwitch'
import {
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
    AuthAction,
} from 'next-firebase-auth'
import getAbsoluteURL from '../utils/getAbsoluteURL'
import { AddIcon, DeleteIcon, StarIcon, PhoneIcon, EditIcon, CalendarIcon } from "@chakra-ui/icons"
import firebase from 'firebase/app'
import 'firebase/firestore'
import Header from '../components/Header'

const Event = () => {
    const AuthUser = useAuthUser()
    const [inputName, setInputName] = useState('')
    const [inputDate, setInputDate] = useState('')
    const [events, setEvents] = useState([])

    useEffect(() => {
        AuthUser.id &&
            firebase
                .firestore()
                .collection("my_events")
                .where('user', '==', AuthUser.id)
                .onSnapshot(
                  snapshot => {
                    setEvents(snapshot.docs.map(
                      doc => {
                        return {
                          eventID: doc.id, 
                          eventName: doc.data().name,
                          eventDate: doc.data().date.toDate().toDateString()
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
                .collection("my_events") // all users will share one collection 
                .add({
                    name: inputName,
                    date: firebase.firestore.Timestamp.fromDate( new Date(inputDate) ),
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: AuthUser.id
                })
                .then(console.log('Praise the Lord! Event was successfully sent to the Firestore!'));
              // flesh out user-entered values in the input elements 
              setInputName('');
              setInputDate('');
                

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
    const updateEvent = async (t, eventName, eventDate) => {
      try {
        const editContact = {eventName: setName, eventDate: setDate}
        firebase
          .firestore()
          .collection("my_events")
          .doc(t)
          .update(eventName, eventDate)
          .then(console.log("Praise the Lord! Event was successfully updated."))
      } catch(error) {
        console.log(error)
      }
    }

    const deleteEvent = (t) => {
        try {
            firebase
                .firestore()
                .collection("my_events")
                .doc(t)
                .delete()
                .then(console.log('Praise the Lord! Event was successfully deleted!'))
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
  
   
  
              <InputGroup width={{base: 'auto', sm: 'auto', md: 'auto'}} pb={7} >
                  <InputLeftElement
                      pointerEvents="none"
                      style={{ verticalAlign: "middle"}} children={<AddIcon color="gray.300" />}
                  />
                  <Input fontSize={{ base: "18px", md: "20px", lg: "30px" }} variant="flushed" type="first_name" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="What's the event?" />
                  <Input variant="flushed" type="date" value={inputDate} onChange={(e) => setInputDate(e.target.value)} placeholder="When's da date?" style={{ marginLeft: '.5rem' }}/>
                  <Button
                      ml={12}
                      onClick={() => sendData()} style={{ marginLeft: '.5rem' }}
                  >
                      Add!
                  </Button>
              </InputGroup>
  
              {events.map((item, i) => {
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
                                    
                                      <EditIcon  style={{ marginInlineEnd: '.5rem' }} />
                                        {item?.eventName}
                                    </ListItem>
                                    <ListItem fontSize={{ base: "14px", md: "20px", lg: "30px" }}>
                                    
                                      <CalendarIcon   style={{ marginInlineEnd: '.5rem' }} />
                                      {item?.eventDate}
                                    </ListItem>
                                </List>
                              </Flex>
                              <Flex direction={{base: 'column-reverse', md: 'row'}} p={7} align="left">
                              <Stack spacing={4} ml={7} direction="row">
                                <IconButton onClick={() => updateEvent(item.eventID)} icon={<EditIcon />} />
                              
                                <IconButton  ml={2} oonClick={() => deleteEvent(item.eventID)} icon={<DeleteIcon />} />
                              </Stack>
                          </Flex>
                          </Flex>
                      </React.Fragment>
                  )
              })}
          
        </Container>
      )
  }
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
})(Event)
