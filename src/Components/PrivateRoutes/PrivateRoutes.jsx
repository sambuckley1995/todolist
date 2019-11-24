import { Component } from "react";
import { globalHistory } from "@reach/router";

class PrivateRoutes extends Component {
  render() {
    if (this.props.user === null) {
      globalHistory.navigate("/login");
      return null;
    } else {
      globalHistory.navigate("/tasks");
      return this.props.children;
    }
  }
}

export default PrivateRoutes;
