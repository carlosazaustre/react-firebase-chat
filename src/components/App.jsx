import React, { Component } from 'react'
import firebase from 'firebase'

import Header from './Header'
import MessageInput from './MessageInput'

class App extends Component {
  constructor () {
    super()
    this.state = {
      messages: [],
      user: null
    }
  }

  componentWillMount () {
    const database = firebase.database().ref().child('messages')

    database.on('child_added', snap => {
      this.setState({
        messages: this.state.messages.concat(snap.val())
      })
    })

    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  handleAuth () {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('https://www.googleapis.com/auth/plus.login')

    firebase.auth().signInWithPopup(provider)
      .then(result => console.log(`${result.user.email} ha iniciado sesión`))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleLogout () {
    firebase.auth().signOut()
      .then(result => console.log('Te has desconectado correctamente'))
      .catch(error => console.log(`Error ${error.code}: ${error.message}`))
  }

  handleSendMessage (event) {
    event.preventDefault()
    const database = firebase.database().ref().child('messages')

    let message = database.push()
    let msg = { text: event.target.text.value }
    message.set(msg)
  }

  render () {
    return (
      <div>
        <Header
          appName='Chat Real'
          user={this.state.user}
          onAuth={this.handleAuth.bind(this)}
          onLogout={this.handleLogout.bind(this)}
        />
        <main role='main' className='container'>
          {this.state.messages.map(msg => (
            <li>{msg.text}</li>
          ))}
        </main>
        <MessageInput
          onSendMessage={this.handleSendMessage.bind(this)}
        />
      </div>
    )
  }
}

export default App
