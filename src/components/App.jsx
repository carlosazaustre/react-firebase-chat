import React, { Component } from 'react'
import firebase from 'firebase'

import Header from './Header'
import MessageInput from './MessageInput'

class App extends Component {
  constructor () {
    super()
    this.state = {
      messages: []
    }
  }

  componentWillMount () {
    const database = firebase.database().ref().child('messages')

    database.on('child_added', snap => {
      this.setState({
        messages: this.state.messages.concat(snap.val())
      })
    })
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
        <Header appName='Chat Real' />
        <main role='main' className='container'>
          {this.state.messages.map(msg => (
            <li>{msg.text}</li>
          ))}
        </main>
        <MessageInput onSendMessage={ this.handleSendMessage.bind(this) } />
      </div>
    )
  }
}

export default App
