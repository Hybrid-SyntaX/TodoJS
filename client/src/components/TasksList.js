import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TasksList extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }
  remove = t => {
    this.props.deleteTask(t);
  };
  edit = t => {
    //console.log(e);
    t.name = t.name + " U-" + Date.now();
    this.props.updateTask(t);
  };
  toggleCompletion = t => {
    if (t.completionDate) this.props.undoTask(t);
    else this.props.doTask(t);
  };
  renderCompletionButton(t) {
    if (t.completionDate)
      return (
        <button
          className="button is-small"
          onClick={this.toggleCompletion.bind(null, t)}
        >
          <i className="fa fa-times" />
        </button>
      );
    else
      return (
        <button
          className="button is-small"
          onClick={this.toggleCompletion.bind(null, t)}
        >
          <i className="fa fa-check" />
        </button>
      );
  }
  render() {
    const tasks = this.props.tasks || [];

    const listTasks = tasks.map(t => (
      <tr key={t._id}>
        <td>{t.name}</td>
        <td>
          <button
            className="button is-small"
            onClick={this.remove.bind(null, t)}
          >
            <i className="fa fa-remove" />
          </button>
          <button className="button is-small" onClick={this.edit.bind(null, t)}>
            <i className="fa fa-edit" />
          </button>
          {this.renderCompletionButton(t)}
        </td>
      </tr>
    ));

    return (
      <table className="table is-bordered is-hoverable  is-6">
        <thead>
          <tr>
            <th scope="col" />
            <th scope="col" />
            <th scope="col" />
            <th scope="col" />
          </tr>
        </thead>
        <tbody>{listTasks}</tbody>
      </table>
    );
  }
}
function mapStateToProps({ tasks }) {
  return { tasks };
}
export default connect(mapStateToProps, actions)(TasksList);
