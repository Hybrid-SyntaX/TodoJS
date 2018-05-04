import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class NewTask extends Component {
  constructor() {
    super();
    this.task = { name: "" };
  }
  componentDidMount() {
    // this.props.newTask();
  }
  onChange = e => {
    const task = this.task;
    task[e.target.name] = e.target.value;
    this.setState(task);
  };
  onSubmit = e => {
    e.preventDefault();
    // get our form data out of state
    //const { fname, lname, email } = this.state;
    console.log(this.task);
    this.props.newTask(this.task);
    //axios.post("/", { fname, lname, email }).then(result => {
    //access the results here....
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div className="field has-addons level-item">
          <div className="control">
            <input
              className="input"
              type="text"
              name="name"
              value={this.task.name}
              onChange={this.onChange}
              id="name"
              placeholder="Add a new task"
            />
          </div>
          <div className="control">
            <button className="button is-info">
              <i className="fa fa-plus" />
            </button>
          </div>
        </div>
      </form>
    );
  }
}
export default connect(null, actions)(NewTask);
