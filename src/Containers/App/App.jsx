import React, { Component } from "react";
import styles from "./App.module.scss";
import Routes from "../../Routes";
import firebase, { provider } from "../../firebase";
import { navigate } from "@reach/router";

class App extends Component {
  state = {
    user: null
  };

  signIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //var token = result.credential.accessToken;
        // The signed-in user info.
        console.log("triggered");
        const user = result.user;
        this.setState({
          user
        });
        navigate(`/tasks`);
        console.log(this.state.user);
      })
      .catch(error => {
        // An error happened.
        console.log(error);
      });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        this.setState({
          user: null
        });
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
  };

  render() {
    const welcome =
      this.state.user !== null ? (
        <h1 className={styles.header}>
          Welcome {this.state.user.displayName}, hope you are well today?
        </h1>
      ) : (
        <h1 className={styles.header}>Welcome, please sign in below</h1>
      );
    return (
      <>
        <header>{welcome}</header>
        <main>
          <Routes user={this.state.user} signIn={this.signIn} />
        </main>
        <footer>
          <button onClick={this.signOut}>Sign Out</button>
        </footer>
      </>
    );
  }
}

export default App;
