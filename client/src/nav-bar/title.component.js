import React from 'react'
import { Link } from 'react-router-dom'

const TitleComponent = () => {
  const root = {
    height: '100%',
    width: 'fit-content',
    fontSize: '2.75vmax',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Assistant',
    fontWeight: 700,
    color: 'white',
    textDecoration: 'none'
  }
  return (
    <Link style={root} to='/'>
      lovac
    </Link>
  )
}

export default TitleComponent