import React, { Component } from "react";
import { connect } from "react-redux";

class TasksList extends Component {
  render() {
    const tasks = this.props.tasks || [];

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
export default connect(mapStateToProps)(TasksList);
