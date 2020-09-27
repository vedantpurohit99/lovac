import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  FormControl,
  TextField,
  Button
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#fcf9f7',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  support: {
    width: '50%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  mainT: {
    fontFamily: 'Assistant',
    fontWeight: 700,
    fontSize: '2.5vmax',
    padding: '15vh 5vw 2vh 5vw'
  },
  line: {
    border: '1px solid #d95745',
    width: '30vw',
    margin: '0vh 0vw 0vh 8vw'
  },
  lineV: {
    border: '1px solid #d95745',
    height: '40vh',
    padding: '10vh 0vw 15vh 0vw',
    margin: '20vh 0vw 10vh 0vw'
  },
  body: {
    fontFamily: '"Baloo Tammudu 2"',
    fontSize: '1.75vmax',
    padding: '5vh 5vw 0vh 5vw',
    lineHeight: '150%',
  },
  formControl: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'column',
    margin: '2vh 0vw 0vh 0vw'
  },
  elem: {
    margin: '2vh 0vw 2vh 0vw'
  }
})

const SupportComponent = () => {
  const classes = useStyles()
  const [city, setCity] = useState('')
  const [pop, setPop] = useState('')
  const [dens, setDens] = useState('')
  const [e1, setE1] = useState(false)
  const [e2, setE2] = useState(false)
  const [submitted, setSubmitted] = useState('')
  const [chosen, setChosen] = useState('')
  const [cSubmitted, setCSubmitted] = useState('')

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  const onSubmission = async () => {
    const body = {
      'city': city,
      'pop': pop,
      'dens': dens
    }

    if (pop >= 0 && dens >= 0) {
      await fetch('http://localhost:5000/population/add', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              })
              .then(res => res.text())
              .then(res => {
                console.log(res)
                setSubmitted(city)
                setCity('')
                setPop('')
                setDens('')
              })
    }
  }

  const onChosen = async () => {
    const body = {
      'city': chosen.toLowerCase(),
    }
    await fetch('http://localhost:5000/population/vaccine', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
              })
              .then(res => res.text())
              .then(res => {
                console.log(res)
                setCSubmitted(chosen)
                setChosen('')
              })
  }

  return (
    <div className={classes.root}>
      <div className={classes.support}>
        <div className={classes.mainT}>
          Help make lovac better! <span role='img' aria-label='hammer'>🔨</span>
        </div>
        <div className={classes.line} />
        <div className={classes.body}>
          If you did not see your city in the tool, please add it by giving us some basic
          information of your city.
          <br/>
          <FormControl className={classes.formControl}>
            <TextField
              id="city"
              className={classes.elem}
              label="City"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Ex: Miami, Florida'
              value={city}
              variant="filled"
              onChange={(e) => setCity(e.target.value)}
              helperText='Format: city, state'
            />
            <TextField
              id="pop"
              className={classes.elem}
              error={e1}
              label="Population"
              type="number"
              value={pop}
              InputLabelProps={{
                shrink: true,
              }}
              placeholder='Ex: 42000'
              variant="filled"
              onChange={(e) => {
                if (e.target.value >= 0){
                  setPop(e.target.value)
                  setE1(false)
                } else {
                  setE1(true)
                }
              }}
              helperText='Enter a positive integer'
            />
            <TextField
              id="pop"
              className={classes.elem}
              label="Population Density"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              error={e2}
              value={dens}
              placeholder='Ex: 1.3'
              variant="filled"
              onChange={(e) => {
                if (e.target.value >= 0){
                  setDens(e.target.value)
                  setE2(false)
                } else {
                  setE2(true)
                }
              }}
              helperText='Enter a positive value'
            />
            <Button
              variant="contained"
              className={classes.elem}
              color="primary"
              onClick={onSubmission}
            >
              Add City!
            </Button>
          </FormControl>
          <br/>
          { submitted && 
          <div>Thank you for submitting <b>{submitted}</b> to our system.</div>}
        </div>
      </div>
      <div className={classes.lineV} />
      <div className={classes.support}>
        <div className={classes.mainT}>
          Share lovac on your socials! <span role='img' aria-label='fire'>🔥</span>
        </div>
        <div className={classes.line} />
        <div className={classes.body}>
          Share lovac an raise awareness for vaccination!
          <br/>
          <br/>
          <a href="https://twitter.com/intent/tweet?button_hashtag=HealthyConversations&ref_src=twsrc%5Etfw" class="twitter-hashtag-button" data-size="large" data-text="Raise awareness for vaccination and use lovac to find out what your city needs to do to obtain herd immunity against COVID-19" data-lang="en" data-show-count="false">Tweet #HealthyConversations</a>
          <br/>
          <br/>
          <iframe src="https://www.facebook.com/plugins/share_button.php?href=https%3A%2F%2Ffacebook.com&layout=button_count&size=large&width=107&height=28&appId" width="110" height="28" style={{border:'none', overflow:'hidden'}} scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media"></iframe>
          <br/>
          <br/>
          Let us know if you have or will be getting a vaccine for COVID-19!
          <br/>
          <FormControl className={classes.formControl}>
            <TextField
                className={classes.elem}
                label="Your City"
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder='Ex: Miami, Florida'
                value={chosen}
                variant="filled"
                onChange={(e) => setChosen(e.target.value)}
                helperText='Format: city, state'
              />
            <Button
                variant="contained"
                className={classes.elem}
                color="primary"
                onClick={onChosen}
              >
                Count me in!
            </Button>
          </FormControl>
          { cSubmitted && 
          <div>Thank you for getting vaccinated in <b>{cSubmitted}</b>.</div>}
        </div>
      </div>
    </div>
  )
}

export default SupportComponent