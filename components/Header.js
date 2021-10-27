import React from 'react'
import Link from 'next/link'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  useBreakpointValue,
  Button,
  Stack,
  Text,
  Flex
} from "@chakra-ui/react"

import { CloseIcon, LockIcon, UnlockIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

const nfaDependencyVersion =
  require('../package.json').dependencies['next-firebase-auth']
const nextDependencyVersion = require('../package.json').dependencies.next
const firebaseDependencyVersion =
  require('../package.json').dependencies.firebase

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
  },
  versionsContainer: {
    marginLeft: 0,
    marginRight: 'auto',
  }
  
}

const Header = ({ email, signOut }) => (
  <Stack style={styles.container}  direction={{base: 'column', md: 'row'}}>
    <div style={styles.versionsContainer}>
    <Menu isLazy>
    <MenuButton 
       color="white"
            fontWeight="bold"
            variant="outline"
            borderRadius="md"
            fontSize="32px"
            bgGradient="linear(to-r, #575aff, #c7f8ff)"
            _hover={{
              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
            }}  >Open me!</MenuButton>
      <MenuList>
      {/* MenuItems are not rendered unless Menu is open */}
        <MenuItem>
          <a href="/">Go Home</a>
        </MenuItem>
        <MenuItem>
          <a href="/todo">Create Todo</a>
        </MenuItem>
        <MenuItem>
          <a href="/event">Create Event</a>
        </MenuItem>
        <MenuItem>
          <a href="/contacts">Create Contact</a>
        </MenuItem>
      </MenuList>
      </Menu>
      
      

        <Text fontWeight="bold">Thank you to Jesus</Text>
        <Text>Thank you to Professor for the awesome tutorials</Text>
        <Text>Thank you everyone in the Support Discussions</Text>
      
    </div>
    
    {email ? (
      <>
        <p style={{ paddingRight: "10px"}} >Welcome, <span style={{ color: "#575aff"}}> {email} </span></p>
        <Button onClick={() => {
            signOut()
          }} leftIcon={<UnlockIcon />} color="white"
            fontWeight="bold"
            variant="outline"
            borderRadius="md"
            bgGradient="linear(to-r, #575aff, #c7f8ff)"
            _hover={{
              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
            }}  >
          Sign out
        </Button>
        
        
      </>
    ) : (
      <>
        <p>Sorry there, you're not signed in.</p>
        <Link href="/auth">
          <a>
          <Button leftIcon={<LockIcon />} color="white"
            fontWeight="bold"
            variant="outline"
            borderRadius="md"
            bgGradient="linear(to-r, #575aff, #c7f8ff)"
            _hover={{
              bgGradient: "linear(to-r, #c7f8ff, #c77cc)",
            }}  >
          Sign in
        </Button>
          </a>
        </Link>
      </>
    )}
  </Stack>
)

export default Header
