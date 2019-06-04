import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import { runtimeConfig } from './config';
import Home from "./Home";

const App = () => (
  <Switch>
    <Route exact path={`${runtimeConfig.relative_path}/`} component={Home} />
  </Switch>
);

export default App;
