import React from 'react';
import './App.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';  // Import Amplify UI styles

Amplify.configure(awsconfig);

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Authenticator>
                    {({ signOut, user }) => (
                        <div>
                            <h2>Hello, {user.username}</h2>
                            <button onClick={signOut}>Sign out</button>
                            <h2>My App Content</h2>
                        </div>
                    )}
                </Authenticator>
            </header>
        </div>
    );
}

export default withAuthenticator(App);
