import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

class TasksList extends Component {
  constructor(props) {
    super(props);
    //this.currentTask = this.props.tasks[0];
    this.state = {
      currentTask: {},
      selectedTask: {},
      originalTask: {},

      editMode: false,
      deleteMode: false
    };
  }
  componentDidMount() {
    this.props.fetchTasks();
  }

  toggleCompletion = t => {
    if (t.completionDate) this.props.undoTask(t);
    else this.props.doTask(t);
  };

  select = (name, event) => {
    //event.stopPropagation();
    let selected = this.state.currentTask;
    selected = {};
    let selectedTasks = selected[name] === "is-selected" ? "" : "is-selected";

    selected[name] = selectedTasks;

    this.setState({ currentTask: selected });

    console.log(event.target);

    this.setState({ editMode: false, deleteMode: false });
  };
  cancelParentEvents = event => {
    event.stopPropagation();
  };
  renderTask(t) {
    if (this.state.editMode && this.state.currentTask[t._id] === "is-selected")
      return (
        <input
          className="input"
          name="name"
          onClick={this.cancelParentEvents.bind(this)}
          value={this.state.selectedTask.name}
          onChange={this.onChange}
        />
      );
    else {
      if (t.completionDate) return <td className="is-success">{t.name}</td>;
      else return <td>{t.name}</td>;
    }
  }
  edit = event => {
    event.stopPropagation();
    //console.log(e);
    this.props.updateTask(this.state.selectedTask);
    this.setState({ editMode: false });
  };

  onChange = e => {
    const task = this.state.selectedTask;
    task[e.target.name] = e.target.value;
    this.setState({ selectedTask: task });
  };
  renderCompletionButton(t) {
    if (t.completionDate)
      return (
        <button
          className="button"
          onClick={this.toggleCompletion.bind(null, t)}
        >
          <i className="fa fa-times" />
        </button>
      );
    else
      return (
        <button
          className="button"
          onClick={this.toggleCompletion.bind(null, t)}
        >
          <i className="fa fa-check" />
        </button>
      );
  }
  cancelEditMode = event => {
    event.stopPropagation();
    this.setState({ editMode: false });
    //console.log(this.originalTask.name);
    //this.setState({ selectedTask: this.originalTask });
    this.setState({
      selectedTask: this.props.readTask(this.state.selectedTask._id)
    });

    //this.selectedTask;
  };
  enableEditMode = (t, event) => {
    event.stopPropagation();
    this.setState({ editMode: true });
    this.setState({ selectedTask: t });

    //this.setState({ originalTask: t });
  };
  remove = event => {
    event.stopPropagation();
    this.props.deleteTask(this.state.selectedTask);
    this.setState({ deleteMode: false });
  };
  enableDeleteMode = (t, event) => {
    event.stopPropagation();
    this.setState({ deleteMode: true });
    this.setState({ selectedTask: t });
  };
  cancelDeleteMode = event => {
    event.stopPropagation();
    this.setState({ deleteMode: false });
  };
  renderDeleteButton(t) {
    if (!this.state.editMode) {
      if (
        this.state.deleteMode &&
        this.state.currentTask[t._id] === "is-selected"
      ) {
        return (
          <div className="buttons has-addons">
            <button
              className="button "
              onClick={this.cancelDeleteMode.bind(this)}
            >
              <i className="fa fa-ban" />
            </button>
            <button className="button ">
              <i className="fa fa-trash" onClick={this.remove.bind(this)} />
            </button>
          </div>
        );
      } else {
        return (
          <button
            className="button"
            onClick={this.enableDeleteMode.bind(this, t)}
          >
            <i className="fa fa-remove" />
          </button>
        );
      }
    }
  }
  renderEditButton(t) {
    if (!this.state.deleteMode)
      if (
        this.state.editMode &&
        this.state.currentTask[t._id] === "is-selected"
      ) {
        return (
          <div className="buttons has-addons">
            <button
              className="button "
              onClick={this.cancelEditMode.bind(this)}
            >
              <i className="fa fa-ban" />
            </button>
            <button className="button " onClick={this.edit.bind(this)}>
              <i className="fa fa-save" />
            </button>
          </div>
        );
      } else {
        return (
          <button
            className="button"
            onClick={this.enableEditMode.bind(this, t)}
          >
            <i className="fa fa-edit" />
          </button>
        );
      }
  }
  renderButtons(t) {
    if (this.state.currentTask[t._id] == "is-selected") {
      return (
        <td>
          {this.renderDeleteButton(t)}
          {this.renderEditButton(t)}
        </td>
      );
    }
  }
  render() {
    const tasks = this.props.tasks || [];

    const listTasks = tasks.map(t => (
      <tr
        className={this.state.currentTask[t._id]}
        key={t._id}
        onClick={this.select.bind(this, t._id)}
      >
        <td>{this.renderCompletionButton(t)}</td>
        {this.renderTask(t)}
        {this.renderButtons(t)}
      </tr>
    ));

    return (
      <table className="table is-bordered is-hoverable ">
        <tbody>{listTasks}</tbody>
      </table>
    );
  }
}
function mapStateToProps({ tasks }) {
  return { tasks };
}
export default connect(mapStateToProps, actions)(TasksList);
