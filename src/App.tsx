import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './Login';
import Dashboard from "./Dashboard";
import './App.css';

function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route exact path="/login" component={Login}/>
                  <Route exact path="/dashboard" component={Dashboard}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
