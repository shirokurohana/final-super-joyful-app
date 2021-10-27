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
    Stack,
    Divider, 
    List, 
    ListItem, 
    ListIcon, 
    OrderedList, 
    UnorderedList,
    Grid, 
    GridItem,
    Wrap, 
    WrapItem
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
import { createBreakpoints } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
})

const Todo = () => {
    const AuthUser = useAuthUser()
    const [inputTodo, setTodo] = useState('')
    const [todos, setTodos] = useState([])


    useEffect(() => {
        AuthUser.id &&
            firebase
                .firestore()
                .collection("my_todos")
                .where('user', '==', AuthUser.id)
                .onSnapshot(
                
                  snapshot => {
                    setTodos(snapshot.docs.map(
                      doc => {
                        var itemData = {}
                        return itemData = {
                          todoID: doc.id, 
                          todo: doc.data().todo
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
                .collection("my_todos") // all users will share one collection 
                .add({
                    todo: inputTodo,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    user: AuthUser.id,
                    
                })
                .then(console.log('Praise the Lord! Todo was successfully sent to the Firestore!'));
              // flesh out user-entered values in the input elements 
              setTodo('');
                

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
    
    // All credits to Vets Who Code: https://dev.to/vetswhocode/build-a-crud-firestore-app-in-react-gatsby-with-hooks-4ig9#edit-data
    // All credits to StackOverflow Frosty619: https://stackoverflow.com/questions/62207822/how-to-get-uid-of-document-in-cloud-firestore-swift
    // All credits to StackOverflow JM007
    // https://stackoverflow.com/questions/49996226/how-to-add-user-uid-in-the-place-of-firestore-document-id
    // All credits to Sli4o 
    // https://stackoverflow.com/questions/69659405/uncaught-syntaxerror-unexpected-reserved-word-await


  // All credits to Professor:

  const updateTodo = async (item) => {
    try {
      console.log("sending!");
      // try to update doc
      const docref = await firebase.firestore().collection("my_todos").doc(item.id);
      
      const doc = docref.get();

      if (!doc.empty) {
        docref.update(
          {
            todo: inputTodo,

          }
        );
        console.log("Praise the Lord, your todo has been updated!");
      }

    } catch (error) {
      console.log(error);
    }
  }

    


    const deleteTodo = (t) => {
        try {
            firebase
                .firestore()
                .collection("my_todos")
                .doc(t)
                .delete()
                .then(console.log('Praise the Lord! Todo was successfully deleted! '))
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
                <Input fontSize={{ base: "18px", md: "20px", lg: "30px" }} variant="flushed" type="first_name" value={inputTodo} onChange={(e) => setTodo(e.target.value)} placeholder="What's the todo?" />
                <Button
                    ml={12}
                    onClick={() => sendData()} style={{ marginLeft: '.5rem' }}
                >
                    Add!
                </Button>
            </Stack>

            {todos.map((item, i) => {
                return (
                    <React.Fragment  key={i}>
                        {i > 0 && <Divider />}
                        <Flex
                            h={{base: 'auto', md:'auto'}} alignItems="center" direction={{base: 'column-reverse', md: 'row'}}
                        >
                            <Flex align="center">
                              <Text fontSize={{ base: "18px", md: "20px", lg: "30px" }} mr={4} bgGradient="linear(to-r, #575aff, #c7f8ff)"
  bgClip="text"  >{i + 1}.</Text>
                                <List  style={{ marginLeft: '.5rem' }}>
                                  <ListItem fontSize={{ base: "18px", md: "20px", lg: "30px" }}>
                                  
                                    <EditIcon />
                                      {item?.todo}
                                  </ListItem>
                              </List>
                            </Flex>
                            <Flex direction={{base: 'column-reverse', md: 'row'}} p={7} align="left">
                            <Stack spacing={4} direction="row">
                              <IconButton onClick={() => updateTodo(item)} icon={<EditIcon />} />
                            
                              <IconButton  ml={2} oonClick={() => deleteTodo(item.todoID)} icon={<DeleteIcon />} />
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
})(Todo)
