import React, { Component } from "react";
import Header from "./Header";
import Questions from "./Questions";
import { Switch, Route } from "react-router-dom";
import QuestionDetails from "./QuestionDetails";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import PrivateRoute from "./PrivateRoute";

export class Home extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <PrivateRoute exact path="/questions/add" component={NewQuestion} />
          <PrivateRoute
            exact
            path="/questions/leaderboard"
            component={Leaderboard}
          />
          <PrivateRoute
            exact
            path="/questions/:id"
            component={QuestionDetails}
          />
          <PrivateRoute exact path="/questions/" component={Questions} />
        </Switch>
      </div>
    );
  }
}

export default Home;
