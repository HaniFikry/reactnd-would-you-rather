import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";

export class NewQuestion extends Component {
  state = {
    toHome: false
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    let question = this.serializeQuestion();
    this.props.dispatch(handleSaveQuestion(question));
    this.setState({
      toHome: true
    });
  };

  serializeQuestion = () => {
    let question = {};
    question["author"] = this.props.authedUser;
    question["optionOneText"] = this.state.optionOne;
    question["optionTwoText"] = this.state.optionTwo;
    return question;
  };

  render() {
    if (this.state.toHome) {
      return <Redirect to="/" />;
    }
    return (
      <div className="new-question">
        <div className="question-user">
          <img
            className="user-card__avatar small-avatar"
            src={this.props.user.avatarURL}
            alt="avatar"
          />
          <p className="question-card-bold question-card-text">
            {this.props.user.name}
          </p>
        </div>
        <form onSubmit={this.handleSubmit}>
          <p className="white-text"> Would you rather </p>
          <input
            placeholder="Option One"
            type="text"
            name="optionOne"
            onChange={this.handleChange}
          />
          <p className="white-text"> Or </p>
          <input
            placeholder="Option Two"
            type="text"
            name="optionTwo"
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  let user = users[authedUser];
  return {
    authedUser,
    user
  };
};

export default connect(mapStateToProps)(NewQuestion);
