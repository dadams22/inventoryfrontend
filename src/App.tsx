import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { Layout } from 'antd';
import Login from './scenes/Login';

import Home from './scenes/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Layout>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/' component={Home} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
