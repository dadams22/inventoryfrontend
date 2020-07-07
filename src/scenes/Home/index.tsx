import React, { useEffect } from 'react';
import { Redirect, Route, Switch, Link } from 'react-router-dom';
import { Layout, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NavigationBar from '../../components/NavigationBar';
import Scales from './components/Scales';
import { ApplicationState } from '../../store';
import { fetchItems } from '../../services/items';
import { fetchScales } from '../../services/scales';
import Inventory from './components/Inventory/components';

function Home() {
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state: ApplicationState) => state.user.authenticated,
  );

  // Fetch data from backend on first successful authentication
  useEffect(() => {
    if (authenticated) {
      dispatch(fetchItems());
      dispatch(fetchScales());
    }
  }, [authenticated]);

  return !authenticated ? (
    <Redirect to='/login' />
  ) : (
    <>
      <NavigationBar />
      <Layout.Content>
        <Switch>
          <Route path='/inventory' component={Inventory} />
          <Route path='/scales' component={Scales} />
          <Route path='/' component={() => <Redirect to='/inventory' />} />
        </Switch>
      </Layout.Content>
      <Layout.Footer style={{ textAlign: 'center' }}>
        <Typography.Text>Visit </Typography.Text>
        <Link to='http://www.reinventory.info'>reinventory.info</Link>
      </Layout.Footer>
    </>
  );
}

export default Home;
