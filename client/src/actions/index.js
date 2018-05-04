import axios from "axios";

import * as types from "./types";

export const fetchTasks = () => async dispatch => {
  const res = await axios.get("/api/tasks");
  dispatch({ type: types.FETCH_TASKS, payload: res.data });
};
export const readTask = taskId => async dispatch => {
  const res = await axios.get("/api/tasks/" + taskId);
  dispatch({ type: types.READ_TASK, payload: res.data });
};

export const newTask = task => async dispatch => {
  const res = await axios.post("/api/tasks", task);

  dispatch({ type: types.NEW_TASK, payload: res.data });
};
export const updateTask = updatedTask => async dispatch => {
  const res = await axios.put("/api/tasks/" + updatedTask._id, updatedTask);

  dispatch({ type: types.UPDATE_TASK, payload: res.data });
};

export const deleteTask = task => async dispatch => {
  const res = await axios.delete("/api/tasks/" + task._id);

  dispatch({ type: types.DELETE_TASK, payload: res.data });
};

export const doTask = task => async dispatch => {
  const res = await axios.patch("/api/tasks/" + task._id + "/done");

  dispatch({ type: types.DO_TASK, payload: res.data });
};
export const undoTask = task => async dispatch => {
  const res = await axios.patch("/api/tasks/" + task._id + "/undone");

  dispatch({ type: types.UNDO_TASK, payload: res.data });
};
