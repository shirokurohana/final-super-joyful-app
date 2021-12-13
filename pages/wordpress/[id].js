import { Link }  from 'next/link';
import { getAllIds, getData } from '../lib/data';
import Header from '../../components/Header'
import { useAuthUser } from 'next-firebase-auth';
import React from 'react'
import {
  Container,
  Flex,
  Box,
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

import 'firebase/firestore';

export async function getStaticProps({ params }) {
  const itemData = await getData(params.id);
  // console.log(itemData);
  return {
    props: {
      itemData
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
    const paths = await getAllIds();
    return {
      paths,
      fallback: false
    };
  }
  


  // all credits to for Chakra Box cards: https://dev.to/shadowtime2000/simple-chakra-ui-card-53lc
export default function Entry({ itemData }) {
    const AuthUser = useAuthUser();
    return (
      
     <>
<Header email={AuthUser.email} signOut={AuthUser.signOut} />
  <Flex h={{base: 'auto',  sm: 'auto', md:'auto'}} justifyContent="space-between" alignItems="center"direction={{base: 'column-reverse', md: 'row'}}>
                          <Flex align="center">
<Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Box m="5" as="a" href="/blog-post-thing">
          <Heading m="5" mb="0" as="h4" size="md">{itemData.post_title}</Heading>
          <Text m="5" mt="0">Posted by: {itemData.user_login} &#x1F430;</Text>
          <Box m="5" mt="0" dangerouslySetInnerHTML={{__html: itemData.post_excerpt}} />
          <Box m="5" mt="0" dangerouslySetInnerHTML={{__html: itemData.post_content}} />
      
          <Text  m="5" mt="0">Last updated on: {itemData.post_modified}</Text>
         
          <Text  m="5" mt="0">Status: {itemData.post_status}</Text>
        
          <Text  m="5" mt="0">ID #{itemData.ID}</Text>
         
         
   


          
   

          <a href="/"  >
          Back home!
        </a>
  

    
   
        </Box>
    </Box>
    </Flex>
    </Flex>
        
              
    
      </>
    );
  }