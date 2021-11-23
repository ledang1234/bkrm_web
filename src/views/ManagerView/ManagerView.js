import { Route, Switch, useRouteMatch } from "react-router-dom";
import History from './History/History';
import Branch from './Branch/Branch'
import Web from './Web/Web'
import Customer from './Customer/Customer'
import Report from './Report/Report'


import React from "react";

const ManagerView = (props) => {
  const { path } = useRouteMatch();
  return (

      <Switch>
        <Route exact path={path} component={History}/>
        <Route exact path={`${path}/history`} component={History} />
        <Route path={`${path}/branch`} component={Branch} />
        <Route path={`${path}/web`} component={Web} />
        <Route path={`${path}/customer`} component={Customer} />
        <Route path={`${path}/report`} component={Report} />
        
      </Switch>

  );
};

export default ManagerView;
