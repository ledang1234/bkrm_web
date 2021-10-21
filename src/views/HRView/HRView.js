import { Route, Switch, useRouteMatch } from "react-router-dom";
import Employee from './Employee/Employee';
import Schedule from './Schedule/Schedule'

import React from "react";

const HRView = (props) => {
  const { path } = useRouteMatch();
  return (

      <Switch>
        <Route exact path={path} component={Employee}/>
        <Route exact path={`${path}/employee`} component={Employee} />
        <Route path={`${path}/schedule`} component={Schedule} />
      </Switch>

  );
};

export default HRView;
