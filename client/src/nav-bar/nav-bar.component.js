import React from 'react'

import TitleComponent from './title.component'
import MenuComponent from './menu.component'

const NavBar = () => {
  const root = {
    width: '100%',
    height: '8vh',
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#d95745',
    position: 'fixed'
  }
  return (
    <div style={root}>
      <TitleComponent />
      <MenuComponent />
    </div>
  )
}

export default NavBar