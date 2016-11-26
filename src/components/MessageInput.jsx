import React from 'react'

function MessageInput ({ onSendMessage }) {
  return (
    <form className='page-footern blue darken-3' onSubmit={onSendMessage}>
      <div className='container row'>
        <div className='col s9'>
          <input name='text' type='text' placeholder='Escribe tu mensaje...' />
        </div>
        <div className='col s3'>
          <button className='btn waves-effect waves-light blue darken-1' type='submit'>
            Enviar
            <i className="material-icons right">send</i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default MessageInput
