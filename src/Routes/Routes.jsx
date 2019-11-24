import React, { Component } from "react";
import { Router } from "@reach/router";
import Tasks from "../Containers/Tasks";
import Login from "../Containers/Login";
import PrivateRoutes from "../Components/PrivateRoutes";

class Routes extends Component {
  render() {
    return (
      <Router>
        <Login path="login" signIn={this.props.signIn} title="login" />
        <PrivateRoutes path="/" user={this.props.user}>
          <Tasks path="/tasks" user={this.props.user} title="tasks" />
        </PrivateRoutes>
      </Router>
    );
  }
}

export default Routes;
