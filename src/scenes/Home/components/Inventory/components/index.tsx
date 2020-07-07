import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ItemDetails from './ItemDetails';
import InventoryHome from './InventoryHome';

const Inventory = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.path}/:itemId`}>
        <ItemDetails />
      </Route>
      <Route path={match.path}>
        <InventoryHome />
      </Route>
    </Switch>
  );
};

export default Inventory;
