import React, { Component } from "react";
import { Router, Redirect } from "@reach/router";
import Tasks from "../Containers/Tasks";
import Login from "../Containers/Login";
// import PrivateRoutes from "../Components/PrivateRoutes";

class Routes extends Component {
  componentDidMount() {
    this.props.isSignedIn();
  }
  render() {
    // const isSignedIn =
    // this.props.user !== null ? null : <Redirect from="/tasks" to="/login" />;
    return (
      <Router>
        {/* {isSignedIn} */}
        <Redirect noThrow from="/" to="login" />
        <Login path="login" signIn={this.props.signIn} title="login" />
        {/* <PrivateRoutes path="/private" user={this.props.user}> */}
        <Tasks path="/tasks" user={this.props.user} title="tasks" />
        {/* </PrivateRoutes> */}
      </Router>
    );
  }
}

export default Routes;
