import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

import NavBar from './nav-bar/nav-bar.component'
import HomeComponent from './home/home.component'
import AboutComponent from './about/about.component'
import SupportComponent from './support/support.component'

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path="/about">
            <AboutComponent />
          </Route>
          <Route path="/support">
            <SupportComponent />
          </Route>
          <Route path="/">
            <HomeComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
