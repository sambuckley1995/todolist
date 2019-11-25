import React, { Component } from "react";
import styles from "./App.module.scss";
import Routes from "../../Routes";
import firebase, { provider } from "../../firebase";
import { globalHistory } from "@reach/router";
import googleIcon from "../../Static/Images/Google.png";

class App extends Component {
  state = {
    user: null
  };

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        this.setState({
          user
        });
        globalHistory.navigate(`/tasks`);
      })
      .catch(error => {
        console.log(error);
      });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          user: null
        });
        globalHistory.navigate(`/login`);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  isSignedIn = () => {
    this.state.user === null
      ? globalHistory.navigate("/login")
      : console.log(this.props.children);
  };

  render() {
    const welcome =
      this.state.user !== null ? (
        <h1 className={styles.header}>
          Welcome {this.state.user.displayName}, your tasks can be seen below
        </h1>
      ) : (
        <h1 className={styles.header}>Welcome, please sign in below</h1>
      );
    const signOutBtn =
      this.state.user !== null ? (
        <div className={styles.google} onClick={this.signOut}>
          <img src={googleIcon} alt="Google" />
          <button>signOut</button>
        </div>
      ) : null;
    return (
      <>
        <header>{welcome}</header>
        <main>
          <Routes
            user={this.state.user}
            signIn={this.signIn}
            isSignedIn={this.isSignedIn}
          />
        </main>
        <footer>{signOutBtn}</footer>
      </>
    );
  }
}

export default App;
