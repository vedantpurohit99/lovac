import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  ScrollingProvider,
  useScrollSection,
  Section,
} from 'react-scroll-section'
import SearchBar from 'material-ui-search-bar'
import { Link } from 'react-router-dom'

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
    fontFamily: 'Secular One',
    fontWeight: 400,
    fontSize: '2.5vmax',
    padding: '25vh 15vw 5vh 15vw'
  },
  toolRoot: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#fcf9f7',
    display: 'flex',
    flexDirection: 'row',
  },
  calc: {
    width: '50%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  toolT: {
    fontFamily: 'Secular One',
    fontWeight: 400,
    fontSize: '2.5vmax',
    padding: '15vh 5vw 1vh 5vw'
  },
  search: {
    color: '#d95745',
    minWidth: 500,
    outline: 'none',
    margin: '5vh 0vw 0vh 10vw'
  },
  result: {
    minWidth: 500,
    backgroundColor: 'white',
    margin: '0vh 0vw 0vh 10vw',
    borderRadius: '0px 0px 7px 7px',
    boxShadow: '0px 1px 1px 1px #d95745',
  },
  resultItem: {
    width: '100%',
    height: 'fit-content',
    padding: '0.5vh 0vw',
    fontSize: '18px',
    fontFamily: '"Baloo Tammudu 2"',
    transition: '0.2s',
    cursor: 'pointer',
    '&:hover': {
      transition: '0.2s',
      fontWeight: 500,
      fontSize: '22px'
    }
  },
  summary: {
    width: '50%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  body: {
    fontFamily: '"Baloo Tammudu 2"',
    fontSize: '1.75vmax',
    padding: '5vh 5vw 0vh 5vw',
    lineHeight: '125%'
  },
  learn: {
    textDecoration: 'none',
    color: '#d95745'
  },
  secondary: {
    fontFamily: 'Montserrat Alternates',
    fontSize: '2vmax',
    padding: '5vh 20vw 0vh 20vw'
  },
  line: {
    border: '1px solid #d95745',
    width: '12vw',
  },
  line2: {
    border: '1px solid #d95745',
    width: '12vw',
    padding: '0vh 5vw 0vh 5vw',
    margin: '0vh 5vw 0vh 6vw'
  },
  lineV: {
    border: '1px solid #d95745',
    height: '40vh',
    padding: '10vh 0vw 15vh 0vw',
    margin: '20vh 0vw 10vh 3vw'
  },
  buttonRoot: {
    color: '#d95745',
    margin: '10vh 0vw 0vh 0vw',
    padding: '10px 32px 10px 17px',
    borderRadius: '50%',
    border: '1px solid #d95745',
    cursor: 'pointer',
    transition: '0.4s',
    fontSize: '5vh',
    letterSpacing: '-15px',
    '&:hover': {
      transition: '0.4s',
      letterSpacing: '-18px',
      color: 'white',
      backgroundColor: '#d95745'
    }
  },
  support: {
    fontFamily: 'Montserrat Alternates',
    fontSize: '18px',
    margin: '55vh 0vw 0vh 5vw',
    textAlign: 'left'
  }
})

const ButtonComponent = () => {
  const classes = useStyles();
  const toolSection = useScrollSection('tool');

  return (
    <div className={classes.buttonRoot} onClick={toolSection.onClick}>
      &#8643;&#8642;
    </div>
  )
}

const HomeComponent = () => {
  const classes = useStyles();


  const [cities, setCities] = useState([])
  const [results, setResults] = useState([])
  const [selected, setSelected] = useState('')
  const [risk, setRisk] = useState({})

  useEffect(() => {
    if (cities.length === 0) {
      fetch('http://localhost:5000/population/cities')
        .then(res => res.text())
        .then(res => {
          setCities(JSON.parse(res))
        })
    }
  }, [cities])

  const onSearch = (value) => {
    let arr = []
    if (value.length > 3) {
      arr = cities.filter((city) => city.includes(value.toLowerCase()))
    }
    setResults(arr.slice(0,8))
  }

  const onSelection = async (value) => {
    setSelected(value)
    setResults([])

    await fetch('http://localhost:5000/population/risks?name=' + encodeURIComponent(value))
      .then(res => res.json())
      .then(res => {
        setRisk(res)
      })
  }

  return (
    <ScrollingProvider>
      <Section id='main'>
        <div className={classes.root}>
          <div className={classes.mainT}>
            With a COVID-19 vaccine in the works, it is important
            for everyone to know what needs to be done for a vaccine
            to be successful. <span role='img' aria-label='confetti'>🎉</span>
          </div>
          <div className={classes.line} />
          <div className={classes.secondary}>
            lovac is a tool that helps you understand how a COVID-19
            vaccine can be successful in your city. <span role='img' aria-label='strong'>💪</span>
          </div>
          <div className={classes.secondary}>
            Check it out below! <span role='img' aria-label='rocket'>🚀</span>
          </div>
          <ButtonComponent />
        </div>
      </Section>
      <Section id='tool'>
        <div className={classes.toolRoot}>
          <div className={classes.calc}>
            <div className={classes.toolT}>
              Find Your City <span role='img' aria-label='city'>🏠</span>
            </div>
            <div className={classes.line2} />
            <SearchBar
              className={classes.search}
              placeholder='Search you city!'
              onChange={onSearch}
              onCancelSearch={() => setResults([])}
            />
            { results.length > 0 ? 
            (<div className={classes.result}>
              { results.map((result) => (
                  <div 
                    className={classes.resultItem}
                    key={result}
                    value={result}
                    onClick={() => onSelection(result)}
                  >
                    {result}
                  </div>
                ))
              }
            </div>) :
            (
              <div className={classes.support}>
                Don't see your city? Go to <b><Link style={{textDecoration: 'none', color: '#d95745'}} to='/support'>support</Link></b> and help us add it to the tool. <span role='img' aria-label='pray'>🙏</span>
                <br/>
                (Currently only have U.S. cities and counties.)
              </div>
            )
            }
          </div>
          { 
            selected && risk && risk.risk &&
            <>
            <div className={classes.lineV} />
            <div className={classes.summary}>
              <div className={classes.toolT}>
                Summary <span role='img' aria-label='results'>🖨</span>
              </div>
              <div className={classes.line2} />
              <div className={classes.body}>
                <b>{ selected }</b> has a <b style={{ color: risk.risk === 'low' ? 'green' : risk.risk === 'moderate' ? 'orange' : 'red' }}>{ risk.risk }</b> chance of
                having a COVID-19 outbreak.
                <br />
                <br />
                { risk.risk === 'low' && <div>Note that this does not mean that an outbreak is impossible. Please take all nescessary steps in protecting yourself and others. <b><a className={classes.learn} href='https://www.cdc.gov/coronavirus/2019-nCoV/index.html' target='_blank' rel="noopener noreferrer">Learn More</a></b></div> }
                { risk.risk === 'moderate' && <div>Your city is susceptiple to an outbreak if proper care is not taken. Please take all nescessary steps in protecting yourself and others. <b><a className={classes.learn} href='https://www.cdc.gov/coronavirus/2019-nCoV/index.html' target='_blank' rel="noopener noreferrer">Learn More</a></b></div> }
                { risk.risk === 'high' && <div>Your city is very susceptiple to an outbreak. Please take all nescessary steps in protecting yourself and others. <b><a className={classes.learn} href='https://www.cdc.gov/coronavirus/2019-nCoV/index.html' target='_blank' rel="noopener noreferrer">Learn More</a></b></div> }
              </div>
              <div className={classes.body}>
                To get <b><a className={classes.learn} href='https://www.mdanderson.org/cancerwise/what-is-covid-19-coronavirus-herd-immunity-when-will-we-achieve-herd-immunity.h00-159383523.html' target='_blank' rel="noopener noreferrer">herd immunity</a></b> for COVID-19 in your city, between <b>{ Math.round(risk.low) }</b> and <b>{ Math.round(risk.high) }</b> people need to get the COVID-19 vaccine when it is available.
              </div>
              <div className={classes.body}>
                <b className={classes.learn}>People who have or are planning to get vaccinated in your city:</b>
                <br />
                <span style={{fontFamily: 'Acme', fontSize: '36px'}}>{ risk.vaccinated }</span>
                <br />
                { risk.vaccinated >= Math.round(risk.low) ? (<div>(<b style={{color: 'green'}}>On our way to immunity!</b>)</div>) : (<div>(<b style={{color: 'red'}}>Still need to do more</b>)</div>)}
                <br />
                Help us make a difference by <b><Link style={{textDecoration: 'none', color: '#d95745'}} to='/support'>sharing</Link></b>.
              </div>
            </div>
            </>
          }
        </div>
      </Section>
    </ScrollingProvider>
  )
}

export default HomeComponent