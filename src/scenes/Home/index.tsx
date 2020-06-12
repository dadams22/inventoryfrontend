import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import NavigationBar from '../../components/NavigationBar';
import Inventory from './components/Inventory';
import Scales from './Scales';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../store';


function Home() {
  const authenticated = useSelector((state: ApplicationState) => state.user.authenticated);

  return !authenticated ? <Redirect to='/login' /> : (
    <>
      <NavigationBar />
      <Layout.Content>
        <Switch>
          <Route path='/inventory' component={Inventory} />
          <Route path='/scales' component={Scales} />
          <Route path='/' component={() => <Redirect to='/inventory' />} />
        </Switch>
      </Layout.Content>
    </>
  )
}

export default Home;