import React, { useState } from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import {
  Container,
  Flex,
  Heading,
  Link,
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
import firebase from 'firebase/app'
import 'firebase/firestore'
import Header from '../components/Header'
import { TimeIcon, PhoneIcon, CalendarIcon, StarIcon, CloseIcon, LockIcon, UnlockIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { getSortedList } from './lib/data'
import  useSWR from 'swr'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  }
}


export async function getStaticProps() {
  const allData = await getSortedList();
  return {
    props: {
      allData
    },
    revalidate: 60
  }
}

const Demo = ({allData}) => {
  const AuthUser = useAuthUser()
  return (
    <div className="background">
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <Heading style={{ fontSize: "40px" }} bgGradient="linear(to-r, #575aff, #c7f8ff)"
                                    bgClip="text">The Super Joyful App </Heading>
          <h3 spacing={2} style={{ marginBottom: "10px" }}> Schedule your events, add your daily todos, and add your contacts joyfully today!</h3>
          
          <p >
          <Link href="/event" textDecoration="none">

          <Button leftIcon={<CalendarIcon />} color="white"
            fontWeight="bold"
            py={17}
            variant="outline"
            
            borderRadius="md"
            bgGradient="linear(to-r, #575aff, #575aff)"
            _hover={{
              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
            }}  >
          Add an event!
        </Button>

       
        </Link>
        </p>
        <p>
        <Link href="/todo" textDecoration="none">

          <Button leftIcon={<StarIcon />} color="white"
            fontWeight="bold"
            variant="outline"
            py={17}
            borderRadius="md"
            textDecoration="none"
            bgGradient="linear(to-r, #575aff, #575aff)"
            _hover={{
              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
            }}  >
          Add a todo!
        </Button>
  
        </Link>
        </p>
   
        <p>
        <Link href="/contacts" textDecoration="none">

          <Button leftIcon={<PhoneIcon />} color="white"
            fontWeight="bold"
            style={{ marginBottom: "10px" }}
            variant="outline"
            borderRadius="md"
            textDecoration="none"
            py={17}
            bgGradient="linear(to-r, #575aff, #575aff)"
            _hover={{
              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
            }}  >
          Add a contact!
        </Button>

        </Link>
        </p>
        <Heading style={{ fontSize: "20px" }} style={{ marginBottom: "10px" }}  bgGradient="linear(to-r, #575aff, #c7f8ff)"
                                    bgClip="text">All WordPress Posts </Heading>
          {allData.map(({ id, name }) => (
            <div  key={id}>
        
        <h4 spacing={2} fontWeight="bold"> {name}</h4>
                
                  <Link href={`/wordpress/${id}`}>
                  <Button style={{ marginBottom: "10px" }}  color="white"
            fontWeight="bold"
            variant="outline"
            borderRadius="md"
            textDecoration="none"
            py={17}
            bgGradient="linear(to-r, #575aff, #575aff)"
            _hover={{
              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
            }}  >
          Read me!
        </Button>
                  </Link>
                </div>
         
     
          ))}
        </div>
        </div>
      </div>
   
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()
export default withAuthUser()(Demo)
