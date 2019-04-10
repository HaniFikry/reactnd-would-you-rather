import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class PrivateRouting extends React.Component {
  render() {
    const { component: Component } = this.props;
    let url = this.props.location.pathname;
    return (
      <Route
        render={() =>
          this.props.authedUser ? (
            <Component {...this.props} />
          ) : (
            <Redirect to={{ pathname: "/", state: { previousPath: url } }} />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  };
};

export default connect(mapStateToProps)(PrivateRouting);
