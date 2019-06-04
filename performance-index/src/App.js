import React from "react";
import { Route, Switch } from "react-router-dom";
import { runtimeConfig } from './config';
import Home from "./Home";

const App = () => (
  <Switch>
    <Route exact path={`${runtimeConfig.relative_path}/`} component={Home} />
  </Switch>
);

export default App;
