import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import Dashboard from "./scenes/Dashboard";
import './App.css';

function App() {
  return (
      <Router>
          <Switch>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
      </Router>
  );
}

export default App;
