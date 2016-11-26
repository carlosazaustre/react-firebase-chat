import React from 'react'

function ChatMessage ({ message }) {
  return (
    <div className='card-panel grey lighten-5'>
      <div className='row valign-wrapper'>
        <div className='col s2'>
          <img
            width='64px'
            src={message.avatar}
            alt={message.displayName}
            className='circle responsive-img'
          />
        </div>
        <div className='col s10'>
          <span className='black-text'>{message.text}</span>
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
