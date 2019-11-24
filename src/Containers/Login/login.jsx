import React, { Component } from "react";
import googleIcon from "../../Static/Images/Google.png";
import styles from "./Login.module.scss";

class Login extends Component {
  state = {};
  render() {
    return (
      <div className={styles.google}>
        <img src={googleIcon} alt="googleIcon" />
        <button onClick={this.props.signIn}>Sign in with google</button>
      </div>
    );
  }
}

export default Login;
