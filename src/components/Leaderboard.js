import React, { Component } from "react";
import { connect } from "react-redux";

export class Leaderboard extends Component {
  render() {
    return (
      <div className="leaderboard">
        {this.props.users.map(u => {
          return (
            <div key={u.id} className="leaderboard-row">
              <img
                className="user-card__avatar small-avatar"
                src={u.avatarURL}
                alt="avatar"
              />
              <p>{u.id}</p>
              <div className="leaderboard-score-column">
                <p> Questions: {u.questions.length}</p>
                <p> Answers: {Object.keys(u.answers).length}</p>
              </div>
              <p className="leaderboard-score">{u.score}</p>
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  let userScores = Object.keys(users).map(key => {
    return {
      ...users[key],
      ...(users[key].score =
        users[key].questions.length + Object.keys(users[key].answers).length)
    };
  });
  return {
    users: userScores.sort((a, b) => (a.score < b.score ? 1 : -1))
  };
};

export default connect(mapStateToProps)(Leaderboard);

// keysSorted = Object.keys(userScores).sort(function(a,b){return userScores[a]-userScores[b]})
