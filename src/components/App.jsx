import React, { Component } from 'react'
import firebase from 'firebase'

import Header from './Header'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'

const BOT_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/react-firebase-chat-74da6.appspot.com/o/img%2Fpaje_real.png?alt=media&token=7c2a5fd4-09ac-4997-8c50-ae9e1de8fca7'
const BOT_NAME = 'Paje Real'

class App extends Component {
  constructor () {
    super()
    this.state = {
      messages: [],
      user: null,
      count: 0
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
    const messagesDB = firebase.database().ref().child('messages')
    const botDB = firebase.database().ref().child('bot')

    // Gestionamos el mensaje que envía el usuario
    let newUserMessage = messagesDB.push()
    let msg = {
      text: event.target.text.value,
      avatar: this.state.user.photoURL,
      displayName: this.state.user.displayName,
      date: Date.now()
    }
    newUserMessage.set(msg)

    // El bot responde...
    if (this.state.count < 1) {
      // Si es el primer mensaje
      this.setState({ count: 2 })

      firebase.database().ref('/bot/bienvenida').once('value')
        .then(snap => {
          let newBotMessage = messagesDB.push()
          newBotMessage.set({
            text: snap.val(),
            avatar: BOT_AVATAR,
            displayName: BOT_NAME,
            date: Date.now()
          })
        })
    } else {
      // Si es el siguiente y contiene alguna palabra "mágica"
      msg.text = msg.text.toLowerCase()

      if (msg.text.includes('react')) this._handleBotMessage(messagesDB, 'react')
      else if (msg.text.includes('android')) this._handleBotMessage(messagesDB, 'android')
      else if (msg.text.includes('angular')) this._handleBotMessage(messagesDB, 'angular')
      else if (msg.text.includes('javascript')) this._handleBotMessage(messagesDB, 'javascript')
      else if (msg.text.includes('polymer')) this._handleBotMessage(messagesDB, 'polymer')
      else this._handleBotMessage(messagesDB, 'default')
    }
  }

  renderMessages () {
    if (this.state.user) {
      return this.state.messages.map(msg => (
        <ChatMessage message={msg} />
      )).reverse()
    }
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
        <div className='message-chat-list container'>
          <br/><br/>
          {this.renderMessages()}
        </div>
        <ChatInput
          onSendMessage={this.handleSendMessage.bind(this)}
        />
      </div>
    )
  }

  _handleBotMessage (messagesDB, word) {
    firebase.database().ref(`/bot/${word}`).once('value')
      .then(snap => {
        let newBotMessage = messagesDB.push()
        newBotMessage.set({
          text: snap.val(),
          avatar: BOT_AVATAR,
          displayName: BOT_NAME,
          date: Date.now()
        })
      })
  }
}

export default App
