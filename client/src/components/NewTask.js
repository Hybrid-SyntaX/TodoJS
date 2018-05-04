import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class NewTask extends Component {
  constructor() {
    super();
    this.task = { name: "" };
    this.state = { task: {} };
  }
  componentDidMount() {
    // this.props.newTask();
  }
  onChange = e => {
    const task = this.state.task;
    task[e.target.name] = e.target.value;
    this.setState({ task: task });
  };
  onSubmit = event => {
    event.preventDefault();

    this.props.newTask(this.state.task);

    this.setState({ task: {} });
    document.getElementById("newTaskForm").reset();
    //this.task.name = "";
    //this.setState(task);
  };

  render() {
    //onSubmit={this.onSubmit}
    return (
      <form id="newTaskForm">
        <div className="field has-addons ">
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={this.state.task.name}
              onChange={this.onChange}
              id="name"
              placeholder="Add a new task"
            />
          </div>
          <div className="control">
            <button
              className="button is-info"
              onClick={this.onSubmit.bind(this)}
            >
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default connect(null, actions)(NewTask);
