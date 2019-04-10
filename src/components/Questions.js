import React, { Component } from "react";
import { connect } from "react-redux";
import { handleGetQuestions } from "../actions/questions";
import Question from "./Question";

export class Questions extends Component {
  state = {
    selected: "unAnswered"
  };

  changeSelection(selection) {
    if (selection !== this.state.selected) {
      this.setState({
        selected: selection
      });
    }
  }

  componentDidMount() {
    this.props.dispatch(handleGetQuestions());
  }

  render() {
    let questions =
      this.state.selected === "unAnswered"
        ? this.props.unAnsweredQuestions
        : this.props.answeredQuestions;
    return (
      <div>
        <div className="question-selection">
          <p
            className={this.state.selected === "unAnswered" ? "selected" : null}
            onClick={() => this.changeSelection("unAnswered")}
          >
            {" "}
            Un-answered Questions{" "}
          </p>
          <p
            className={this.state.selected === "answered" ? "selected" : null}
            onClick={() => this.changeSelection("answered")}
          >
            {" "}
            Answered Questions{" "}
          </p>
        </div>
        <div className="questions">
          {questions &&
            questions.map(q => (
              <Question user={this.props.user} id={q} key={q} />
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser, users }) => {
  let user = users[authedUser];
  let questionsIds = Object.keys(questions);
  let sortedQuestions = questionsIds.sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  let userAnswersIds = user && Object.keys(user.answers);
  let answeredQuestions = sortedQuestions.filter(id =>
    userAnswersIds.includes(id)
  );
  let unAnsweredQuestions = sortedQuestions.filter(
    id => !userAnswersIds.includes(id)
  );
  return {
    user,
    answeredQuestions: answeredQuestions,
    unAnsweredQuestions: unAnsweredQuestions
  };
};

export default connect(mapStateToProps)(Questions);
