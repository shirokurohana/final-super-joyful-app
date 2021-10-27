import React from 'react'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import FirebaseAuth from '../components/FirebaseAuth'

const styles = {
  content: {
    padding: `8px 32px`,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: 16,
  },
}

const Auth = () => (

    <div className="background">
      <div style={styles.content}>
        <h3>Sign in</h3>
        <div style={styles.textContainer}>
          <p>
            Welcome to The Super Joyful App! Please sign in below 
          </p>
        </div>
        <div>
          <FirebaseAuth />
        </div>
      </div>
    </div>

)

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER,
})(Auth)
