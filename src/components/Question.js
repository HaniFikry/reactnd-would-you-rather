import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Question extends Component {
  render() {
    let { question } = this.props;
    if (question) {
      return (
        <div className="question">
          <div className="question-user">
            <img
              className="user-card__avatar small-avatar"
              src={this.props.user.avatarURL}
              alt="avatar"
            />
            <p className="question-card-bold question-card-text">
              {question.author}
            </p>
          </div>
          <div className="question-card-text">
            <p className="question-card-bold">Would you rather</p>
            <p className="question-option">{question.optionOne.text}</p>
            <p className="question-card-bold">Or</p>
            <p className="question-option">{question.optionTwo.text}</p>
            <div>
              <Link className="question-link" to={`/questions/${question.id}`}>
                View Question
              </Link>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = ({ questions, users }, { id }) => {
  let question = questions[id];
  let user = users[question.author];
  return {
    question,
    user
  };
};

export default connect(mapStateToProps)(Question);
