import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

export class header extends Component {
  handleLogout() {
    this.props.dispatch(setAuthedUser(null));
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="header">
        <div className="header-right">
          <Link className="header-nav" to="/">
            {" "}
            Would You Rather!{" "}
          </Link>
          <Link className="header-nav" to="/questions/add">
            {" "}
            New Question
          </Link>
          <Link className="header-nav" to="/questions/leaderboard">
            {" "}
            Leaderboard
          </Link>
        </div>
        <div className="header-right">
          <p> Hello, {this.props.user && this.props.user.name}</p>
          <img
            className="user-card__avatar small-avatar header-avatar"
            src={this.props.user && this.props.user.avatarURL}
            alt="user avatar"
          />
          <p onClick={() => this.handleLogout()}> Logout </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  let user = users[authedUser];
  return {
    user
  };
};

export default withRouter(connect(mapStateToProps)(header));
