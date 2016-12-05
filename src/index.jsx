import React from 'react'
import { render } from 'react-dom'
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AIzaSyBTKeSmJ-EZT8gFtdQxTdvcw3kDv1xK4pc',
  authDomain: 'react-firebase-chat-74da6.firebaseapp.com',
  databaseURL: 'https://react-firebase-chat-74da6.firebaseio.com',
  storageBucket: 'react-firebase-chat-74da6.appspot.com'
})

import App from './components/App'

render(<App />, document.getElementById('app'))
