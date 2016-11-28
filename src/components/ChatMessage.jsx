import React from 'react'

function ChatMessage ({ message }) {
  return (
    <div className='message-chat row'>
      <div className='col s2'>
        <img
          width='48px'
          className='circle'
          src={message.avatar}
          alt={message.displayName}
        />
      </div>
      <div className='col s10'>
        {message.text}
      </div>
    </div>
  )
}

export default ChatMessage
