import React from 'react'

const Header = ({ mode, setMode }) => {
  return (
    <div className='header'>
      <div className='logo-mode-container'>
        <h1 className='logo'>TODO</h1>
        <span className='mode-icon' onClick={() => {setMode(!mode)}}></span>
      </div>
    </div>
  )
}

export default Header
