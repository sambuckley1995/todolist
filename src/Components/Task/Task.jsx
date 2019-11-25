import React, { Component } from "react";
import { firestore } from "../../firebase";
import styles from "./Task.module.scss";

class Task extends Component {
  state = {
    isComplete: false,
    editNeeded: false,
    editValue: ""
  };
  deleteTask = () => {
    this.props.user != null
      ? firestore
          .collection("users")
          .doc(this.props.user.uid)
          .collection(this.props.user.uid)
          .doc(this.props.taskData.docId)
          .delete()
          .then(() => {
            this.props.reRender();
          })
          .catch(error => {
            console.log(error);
          })
      : console.log("something went wrong");
  };
  updateStatus = () => {
    this.props.user != null
      ? firestore
          .collection("users")
          .doc(this.props.user.uid)
          .collection(this.props.user.uid)
          .doc(this.props.taskData.docId)
          .update({
            isComplete: !this.props.taskData.isComplete
          })
          .then(() => {
            this.props.reRender();
          })
          .catch(error => {
            console.log(error);
          })
      : console.log("something went wrong");
  };
  editStatus = () => {
    this.setState({ editNeeded: !this.state.editNeeded });
  };

  handleChangeEditTask = event => {
    const editValue = event.target.value;
    this.setState({ editValue });
  };

  // submitEdit = ()
  submitEdit = event => {
    const editValue = this.state.editValue;

    this.state.editValue != null
      ? firestore
          .collection("users")
          .doc(this.props.user.uid)
          .collection(this.props.user.uid)
          .doc(this.props.taskData.docId)
          .update({ content: editValue, isComplete: false })
          .then(this.props.reRender())
          .then(this.setState({ editNeeded: !this.state.editNeeded }))
          .catch(error => console.error("error submitting task", error))
      : console.log("insufficient data");
  };

  render() {
    let conditionalStyling = this.props.taskData.isComplete
      ? styles.complete
      : styles.incomplete;

    let buttonText = this.props.taskData.isComplete ? "Not Done" : "Done";

    let conditionalHtml = this.state.editNeeded ? (
      <div className={styles.buttons}>
        <textarea
          className={styles.input}
          onChange={this.handleChangeEditTask}
          name="editTask"
          cols="30"
          rows="1"
          onKeyPress={event => {
            if (event.key === "Enter") {
              this.submitEdit();
            }
          }}
        ></textarea>
        <button onClick={this.submitEdit}>Confirm</button>
        <button onClick={this.editStatus}>Cancel</button>
      </div>
    ) : (
      <div className={styles.buttons}>
        <button className={styles.delete} onClick={this.deleteTask}>
          Delete
        </button>
        <button onClick={this.updateStatus}>{buttonText}</button>
        <button onClick={this.editStatus}>Edit</button>
      </div>
    );

    return (
      <section className={styles.tasks}>
        <article className={styles.task}>
          <em className={conditionalStyling}>{this.props.taskData.content}</em>
        </article>
        {conditionalHtml}
      </section>
    );
  }
}

export default Task;
