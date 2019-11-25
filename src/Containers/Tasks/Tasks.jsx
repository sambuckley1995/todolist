import React, { Component } from "react";
import styles from "./Tasks.module.scss";
import Task from "../../Components/Task";
import { firestore } from "../../firebase";

class Tasks extends Component {
  state = {
    inputValue: "",
    tasks: [],
    filteredTasks: []
  };

  componentDidMount() {
    this.getTasks();
  }

  getTasks = () => {
    this.props.user != null
      ? firestore
          .collection("users")
          .doc(this.props.user.uid)
          .collection(this.props.user.uid)
          .orderBy("isComplete", "desc")
          .get()
          .then(querySnapshot => {
            let tasks = querySnapshot.docs.map(doc => {
              const data = {
                ...doc.data(),
                docId: doc.id
              };
              return data;
            });
            this.setState({
              tasks,
              filteredTasks: tasks
            });
          })
      : console.log("");
  };

  reRender = () => {
    this.setState({ inputValue: "" });
    this.getTasks();
  };

  handleChangeNewTask = event => {
    const inputValue = event.target.value;
    this.setState({ inputValue });
  };

  submitTask = event => {
    const inputValue = this.state.inputValue;

    this.state.inputValue != null
      ? firestore
          .collection("users")
          .doc(this.props.user.uid)
          .collection(this.props.user.uid)
          .doc()
          .set({ content: inputValue, isComplete: false })
          .then(this.reRender())
          .catch(error => console.error("error submitting task", error))
      : console.log("insufficient data");
  };

  render() {
    return (
      <>
        <h1>To-Do List</h1>

        <div className={styles.input}>
          <textarea
            placeholder={`Start entering your task`}
            id=""
            cols="30"
            rows="1"
            onChange={this.handleChangeNewTask}
            value={this.state.inputValue}
            onKeyPress={event => {
              if (event.key === "Enter") {
                this.submitTask();
              }
            }}
          />
          <button onClick={this.submitTask}>Submit</button>
        </div>
        <section className={styles.taskList}>
          <article>
            {this.state.filteredTasks.map(task => (
              <Task
                taskData={task}
                key={task.docId}
                reRender={this.reRender}
                user={this.props.user}
              />
            ))}
          </article>
        </section>
      </>
    );
  }
}

export default Tasks;
