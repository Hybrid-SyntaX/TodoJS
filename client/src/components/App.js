import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import NewTask from "./NewTask";
import TasksList from "./TasksList";

class App extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    // const tasks = this.props.tasks;
    // //if (tasks)
    // const listItems = tasks
    //   ? tasks.map(d => <li key={d.name}>{d.name}</li>)
    //   : [];

    //const listItems = data[].map(d => <li key={d.name}>{d.name}</li>);
    //console.log(listItems);
    return (
      <div>
        <BrowserRouter>
          <div className="columns level">
            <div className="column level-item">
              <NewTask />
              <TasksList />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps({ tasks }) {
  return { tasks };
}

export default connect(mapStateToProps, actions)(App);
