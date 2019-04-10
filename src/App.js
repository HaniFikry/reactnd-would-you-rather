import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoadingBar from 'react-redux-loading'

import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import PrivateRoute from "./components/PrivateRoute";

class App extends Component {
  state = {
    isStopped: false,
    isPaused: false
  };
  render() {
    return (
      <Router>
        <div className="App">
          <LoadingBar style={{ backgroundColor: '#fff', height: '3px' }} />
          <Switch>
            <PrivateRoute path="/questions" component={Home} />
            <Route exact path="/" component={Login} />
            <PrivateRoute component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
