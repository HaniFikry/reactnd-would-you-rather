import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

export class UserCard extends Component {
  setUser(user) {
    this.props.dispatch(setAuthedUser(user));
  }

  render() {
    return (
      <div
        className="user-card"
        onClick={() => this.setUser(this.props.user.id)}
      >
        <img
          className="user-card__avatar"
          src={this.props.user.avatarURL}
          alt="user avatar"
        />
        <p className="user-card__name">
          {this.props.user && this.props.user.id}
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ users }, { id }) => {
  let user = users[id];
  return {
    user
  };
};

export default connect(mapStateToProps)(UserCard);
