import React, { Component, PropTypes } from 'react'
import firebase from 'firebase'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'

const BOT_AVATAR = 'https://firebasestorage.googleapis.com/v0/b/react-firebase-chat-74da6.appspot.com/o/img%2Fpaje_real.png?alt=media&token=7c2a5fd4-09ac-4997-8c50-ae9e1de8fca7'
const BOT_NAME = 'Paje Real'

class ChatMessageList extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)
    this.messagesDB = firebase.database().ref(`messages/${this.props.user.uid}`)
    this.handleSendMessage = this.handleSendMessage.bind(this)
  }

  state = {
    messages: [],
    count: 0
  }

  componentWillMount () {
    this.messagesDB.on('child_added', snap => {
      this.setState({
        messages: this.state.messages.concat(snap.val())
      })
    })
  }

  ComponentWillUnmount () {
    this.messagesDB.off()
  }

  handleSendMessage (text) {
    // Gestionamos el mensaje que envía el usuario
    let newUserMessage = this.messagesDB.push()
    let msg = {
      text,
      avatar: this.props.user.photoURL,
      displayName: this.props.user.displayName,
      date: Date.now()
    }
    newUserMessage.set(msg)

    // El bot responde...
    if (this.state.count < 1) {
      // Si es el primer mensaje...
      this.setState({ count: this.state.count + 1 })
      this._handleBotMessage('bienvenida')

    } else if (this.state.count > 4) {
      // Si ya ha habido varias interacciones...
      this.setState({ count: this.state.count + 1 })
      this._handleBotMessage('despedida')

    } else {
      // Si es el siguiente y contiene alguna palabra "mágica"
      this.setState({ count: this.state.count +1 })
      msg.text = msg.text.toLowerCase()

      if (msg.text.includes('react')) this._handleBotMessage('react')
      else if (msg.text.includes('android')) this._handleBotMessage('android')
      else if (msg.text.includes('angular')) this._handleBotMessage('angular')
      else if (msg.text.includes('javascript')) this._handleBotMessage('javascript')
      else if (msg.text.includes('polymer')) this._handleBotMessage('polymer')
      else if (msg.tex.includes('java')) this._handleBotMessage('Java')
      else if (msg.text.includes('python')) this._handleBotMessage('Python')
      else if (msg.text.includes('patata')) this._handleBotMessage('patata')
      else this._handleBotMessage('default')
    }
  }

  render () {
    return (
      <div>
        <div className="container">
          {
            this.state.messages.map(msg => (
              <ChatMessage
                key={msg.date}
                message={msg}
              />
            )).reverse()
          }
        </div>
        <ChatInput onSendMessage={this.handleSendMessage} />
      </div>
    )
  }

  _handleBotMessage (word) {
    // Método que maneja el envío de mensajes del Bot dependiendo de la palabra
    // que envíe el usuario en el mensaje.
    firebase.database().ref(`bot/${word}`).once('value')
      .then(snap => {
        let newBotMessage = this.messagesDB.push()
        setTimeout(() => {
          newBotMessage.set({
            text: snap.val(),
            avatar: BOT_AVATAR,
            displayName: BOT_NAME,
            date: Date.now()
          })
        }, 1200)
      })
  }
}

export default ChatMessageList
