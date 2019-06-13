import React from "react";
import { Route, Switch } from "react-router-dom";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import HomePage from "./pages/HomePage";
import ReleasePage from "./pages/ReleasePage";
import DetailsPage from "./pages/DetailsPage";
import { runtimeConfig } from './config';


import "./App.css";

const App = () => (
  <Switch>
    <Route exact={true} path={`${runtimeConfig.relative_path}/`} component={HomePage} />
    <Route exact={true} path={`${runtimeConfig.relative_path}/singlerelease/:releaseId`} component={ReleasePage} />
    <Route exact={true} path={`${runtimeConfig.relative_path}/controls/:controlId`} component={DetailsPage} />
  </Switch>
);

export default App;
