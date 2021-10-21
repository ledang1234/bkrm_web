import { Route, Switch, useRouteMatch } from "react-router-dom";
import Cart from './Cart/Cart';
import Invoice from './Invoice/Invoice'
import InvoiceReturn from './InvoiceReturn/InvoiceReturn'

import React from "react";

const SalesView = (props) => {
  const { path} = useRouteMatch();
  return (
      <Switch>
        <Route exact path={path} component={Cart}/>
        <Route exact path={`${path}/cart`} component={Cart} />
        <Route path={`${path}/invoice`} component={Invoice} />
        <Route path={`${path}/invoice-return`} component={InvoiceReturn} />     
    </Switch>

  );
};

export default SalesView;
