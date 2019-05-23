import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReleasePage from "./pages/ReleasePage";

import "./App.css";

const App = () => (
  <Switch>
    <Route exact={true} path="/" component={HomePage} />
    <Route exact={true} path="/singlerelease/:controlParam" component={ReleasePage} />
  </Switch>
);

export default App;
