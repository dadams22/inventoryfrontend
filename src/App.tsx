import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import './App.css';
import { Layout } from 'antd';
import NavigationBar from './components/NavigationBar';
import Inventory from './scenes/Inventory';
import Scales from './scenes/Scales';

const { Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <NavigationBar />
        <Content>
          <Switch>
            <Route exact path={'/login'} component={Login} />
            <Route path={'/inventory'} component={Inventory} />
            <Route path={'/scales'} component={Scales} />
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
