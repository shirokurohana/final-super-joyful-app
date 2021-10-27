import React from 'react'
import initAuth from '../utils/initAuth'
import { ChakraProvider } from "@chakra-ui/react" // <- add this


initAuth()

function MyApp({ Component, pageProps }) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return (
    <ChakraProvider> 
      <Component {...pageProps} />
    </ChakraProvider> // <- add this
  )
}

export default MyApp
