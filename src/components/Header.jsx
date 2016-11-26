import React from 'react'

function Header ({ appName }) {
  return (
    <nav className='blue darken-4'>
      <div className='nav-wrapper container'>
        <a href='#' className='brand-logo'>{appName}</a>
        <ul className='right'>
          <li><a className="waves-effect waves-light btn blue darken-1">Login</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
