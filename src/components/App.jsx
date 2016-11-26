import React, { Component } from 'react'

import Header from './Header'

class App extends Component {
  render () {
    return (
      <div>
        <Header appName='Reyes Magos Chat' />
        <main role='main'>
          Chat
        </main>
      </div>
    )
  }
}

export default App
