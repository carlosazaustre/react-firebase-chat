import React, { Component } from 'react'
import firebase from 'firebase'
import Header from './Header'
import ChatMessageList from './ChatMessageList'

class App extends Component {
  constructor () {
    super()
    this.handleAuth = this.handleAuth.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  state = {
    user: null
  }

  componentWillMount () {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user })
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

  renderMessages () {
    if (this.state.user) {
      return <ChatMessageList user={this.state.user} />
    } else {
      return <div>Debes estar autenticado para poder leer y enviar mensajes</div>
    }
  }

  render () {
    return (
      <div>
        <Header
          appName='Chat Real'
          user={this.state.user}
          onAuth={this.handleAuth}
          onLogout={this.handleLogout}
        />
        <div className='message-chat-list'>
          <br/>
          {this.renderMessages()}
        </div>
      </div>
    )
  }
}

export default App
