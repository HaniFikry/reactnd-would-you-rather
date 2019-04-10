import React, { Component } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";
import ProgressBar from "./ProgressBar";
import NotFound from "./NotFound";

export class QuestionDetails extends Component {
  saveAnswer(answer) {
    let userAnswer = {};
    userAnswer["qid"] = this.props.computedMatch.params.id;
    userAnswer["authedUser"] = this.props.user.id;
    userAnswer["answer"] = answer;
    this.props.dispatch(handleSaveQuestionAnswer(userAnswer));
  }

  render() {
    let id = this.props.computedMatch.params.id;
    let question = this.props.questions[id];
    let askingUser = question && this.props.users[question.author];
    let questionVotes =
      question &&
      question.optionOne.votes.length + question.optionTwo.votes.length;
    let answered =
      question && Object.keys(this.props.user.answers).includes(id);
    let userAnswer = answered && this.props.user.answers[question.id];
    if (question && answered) {
      return (
        <div className="question-details">
          <div className="question-user">
            <img
              className="user-card__avatar small-avatar"
              src={askingUser.avatarURL}
              alt="avatar"
            />
            <p>Asked by: {question.author}</p>
          </div>
          <div className="question-details-options">
            <p> Would You Rather </p>
            <p> {question.optionOne.text}</p>
            <div className="option-results">
              <ProgressBar
                percentage={
                  (question.optionOne.votes.length / questionVotes) * 100
                }
              />
              <p>
                {" "}
                {(
                  (question.optionOne.votes.length / questionVotes) *
                  100
                ).toFixed(2)}
                % ({question.optionOne.votes.length})
              </p>
              {userAnswer === "optionOne" && (
                <p className="user-answer"> Your Answer </p>
              )}
            </div>

            <p> Or </p>
            <p> {question.optionTwo.text}</p>
            <div className="option-results">
              <ProgressBar
                percentage={
                  (question.optionTwo.votes.length / questionVotes) * 100
                }
              />
              <p>
                {" "}
                {(
                  (question.optionTwo.votes.length / questionVotes) *
                  100
                ).toFixed(2)}
                % ({question.optionTwo.votes.length})
              </p>
              {userAnswer === "optionTwo" && (
                <p className="user-answer"> Your Answer </p>
              )}
            </div>
          </div>
        </div>
      );
    } else if (question && !answered) {
      return (
        <div className="question-details">
          <div className="question-user">
            <img
              className="user-card__avatar small-avatar"
              src={askingUser.avatarURL}
              alt="avatar"
            />
            <p>Asked by: {question.author}</p>
          </div>
          <div className="question-details-options">
            <p>Would You Rather</p>
            <p
              className="question-option option-border"
              onClick={() => this.saveAnswer("optionOne")}
            >
              {" "}
              {question.optionOne.text}
            </p>
            <p> Or</p>
            <p
              className="question-option option-border"
              onClick={() => this.saveAnswer("optionTwo")}
            >
              {" "}
              {question.optionTwo.text}{" "}
            </p>
          </div>
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
}

const mapStateToProps = ({ questions, authedUser, users }) => {
  let user = users[authedUser];
  return {
    questions,
    user,
    users
  };
};

export default connect(mapStateToProps)(QuestionDetails);
