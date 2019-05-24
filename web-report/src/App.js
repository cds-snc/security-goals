import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReleasePage from "./pages/ReleasePage";
import DetailsPage from "./pages/DetailsPage";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={HomePage} />
    <Route exact={true} path="/singlerelease/:releaseId" component={ReleasePage} />
    <Route exact={true} path="/controls/:controlId" component={DetailsPage} />
  </Switch>
);

export default App;
