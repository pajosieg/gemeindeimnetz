// first import ./env.js
import './env.js';
import Amplify, { Auth, Hub } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import aws_settings from './aws_settings.js';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Authentication from './stores/Authentication';

Amplify.configure(aws_settings);

const authenticationListener = (data: any) => {
  switch (data.payload.event) {
    case 'signIn':
      Authentication.authenticate(data.payload.data);
      break;
    case 'signOut':
      Authentication.logout();
      break;
  }
};

Auth.currentAuthenticatedUser()
  .then(user => {
    Authentication.authenticate(user);
    setInterval(async () => {
      Auth.currentSession().then(session => {
        const expiration = session.getIdToken().getExpiration();
        console.log('expires in ms:', (expiration * 1000 - Date.now()) / 1000 + 's');
      });
    }, 5000);
  })
  .catch(() => console.log('no user is logged in'));

Hub.listen('auth', authenticationListener);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
