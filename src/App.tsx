import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './scenes/Login';
import Dashboard from "./scenes/Dashboard";
import './App.css';
import { Layout } from "antd";

const { Content } = Layout;

function App() {
    return (
      <Router>
          <Layout>
              <Content>
                  <Switch>
                      <Route exact path="/login" component={Login}/>
                      <Route exact path="/dashboard" component={Dashboard}/>
                  </Switch>
              </Content>
          </Layout>
      </Router>
    );
}

export default App;
