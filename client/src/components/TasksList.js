import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TasksList extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    const tasks = this.props.tasks || [];
    console.log("CURREN TASKS", tasks);
    const listTasks = tasks.map(t => (
      <tr key={t._id}>
        <td>{t.name}</td>
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
