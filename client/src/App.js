import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import CreateBreed from './components/CreateBreed/CreateBreed';
import Details from './components/Details/Details';
import Home from './components/Home/Home'

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path = "/" render={ () => <Landing/> } />
        <Route exact path = "/dogs" render={ () => <Home/> } />
        <Route exact path = "/dogs/:id" render={ () => <Details/> } />
        <Route exact path = "/creation" render={ () => <CreateBreed/> } />
      </Switch>
    </React.Fragment>
  );
}

export default App;
