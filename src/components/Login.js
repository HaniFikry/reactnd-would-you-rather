import React, { Component } from "react";
import { connect } from "react-redux";
import { handleGetUsers } from "../actions/users";
import UserCard from "./UserCard";
import { Redirect } from "react-router-dom";

export class Login extends Component {
  componentDidMount() {
    this.props.dispatch(handleGetUsers());
  }
  render() {
    if (this.props.authedUser) {
      return <Redirect to="/questions" />;
    }

    return (
      <div className="login-container">
        <h1> Select User</h1>
        <div className="users-cards">
          {this.props.userIds.map(id => (
            <UserCard key={id} id={id} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ users, authedUser }) => {
  return {
    userIds: Object.keys(users),
    authedUser: authedUser
  };
};
export default connect(mapStateToProps)(Login);
