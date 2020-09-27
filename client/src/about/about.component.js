import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#fcf9f7',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  mainT: {
    fontFamily: 'Assistant',
    fontWeight: 700,
    fontSize: '2.5vmax',
    padding: '15vh 15vw 2vh 15vw'
  },
  line: {
    border: '1px solid #d95745',
    width: '12vw',
  },
  body: {
    fontFamily: '"Baloo Tammudu 2"',
    fontSize: '1.75vmax',
    padding: '5vh 5vw 0vh 5vw',
    lineHeight: '150%',
  },
})

const AboutComponent = () => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <div className={classes.mainT}>
        lovac's Mission <span role='img' aria-label='handshake'>🤝</span>
      </div>
      <div className={classes.line} />
      <div className={classes.body}>
        lovac strives to surround <b>information</b> around the use and
        effectiveness of vaccines, particularly a COVID-19 vaccine.
        More importantly, it highlights the importance of <b>local vaccination</b> ("lo-vac"),
        and what cities and communities need to do in order for a vaccine to be successful.
        <br/>
        <br/>
        There are a lot of misconceptions that float around vaccines, due to the abundance of
        misinformation attached to them. With the COVID-19 vaccine, it's going to be even worse. We don't
        even have a vaccine out yet and there are theories that the government will take away our freedom
        through them.
        <br/>
        <br/>
        With lovac, the goal is to make people understand that immunization is a process and it does not
        happen overnight. lovac guides people to raise awareness for vaccination and use their
        voice and knowledge to promote vaccination in their cities.
        <br/>
        <br/>
        <span style={{fontSize: '36px'}} role='img' aria-label='syringe'>💉</span>
      </div>
    </div>
  )
}

export default AboutComponent