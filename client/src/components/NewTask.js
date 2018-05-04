import React, { Component } from "react";

class NewTask extends Component {
  render() {
    return (
      <div className="field has-addons level-item">
        <div className="control">
          <input className="input" type="text" placeholder="Add a new task" />
        </div>
        <div className="control">
          <button className="button is-info">
            <i className="fa fa-plus" />
          </button>
        </div>
      </div>
    );
  }
}
export default NewTask;
