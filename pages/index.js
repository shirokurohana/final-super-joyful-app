import React from 'react'
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth'
import Header from '../components/Header'
import DemoPageLinks from '../components/DemoPageLinks'

const styles = {
  content: {
    padding: 32,
  },
  infoTextContainer: {
    marginBottom: 32,
  },
}

const Demo = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Header email={AuthUser.email} signOut={AuthUser.signOut} />
      <div style={styles.content}>
        <div style={styles.infoTextContainer}>
          <h1 style={{ fontSize: "40px" }}>The Joyful Event App </h1>
          <h3> Schedule your events joyfully today!</h3>
          <p>
            Choose which link login below to login in!
          </p>
          <p>
          </p>
          <p> 
            <a href="/event" style={{ fontSize: "20px" }}>Add an event!</a>
          </p>
          <p>
            <a href="/todo" style={{ fontSize: "20px" }}>Add a todo!</a>
          </p>
        </div>
        <DemoPageLinks />
      </div>
    </div>
  )
}

export const getServerSideProps = withAuthUserTokenSSR()()

export default withAuthUser()(Demo)
