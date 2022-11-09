import './App.css';
import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Breeds from './components/Breeds';
import CreateBreed from './components/CreateBreed/CreateBreed';
import Breed from './components/Breed/Breed';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path = "/" render={ () => <Landing/> } />
        <Route exact path = "/dogs" render={ () => <Breeds/> } />
        <Route exact path = "/dogs/:id" render={ () => <Breed/> } />
        <Route exact path = "/creation" render={ () => <CreateBreed/> } />
      </Switch>
    </React.Fragment>
  );
}

export default App;
