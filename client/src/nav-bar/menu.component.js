import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: '25vw',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  menuItem: {
    height: '100%',
    width: 'fit-content',
    fontSize: '1.75vmax',
    display: 'flex',
    alignItems: 'center',
    fontFamily: 'Open Sans Condensed',
    letterSpacing: '0.25vw',
    transition: '0.3s',
    cursor: 'pointer',
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      letterSpacing: '0',
      transition: '0.3s'
    }
  }
})

const MenuComponent = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Link to='/' className={classes.menuItem}>Home</Link>
      <Link to='/about' className={classes.menuItem}>About</Link>
      <Link to='/support' className={classes.menuItem}>Support</Link>
    </div>
  )
}

export default MenuComponent