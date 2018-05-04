import axios from "axios";

import * as types from "./types";

export const fetchTasks = () => async dispatch => {
  const res = await axios.get("/api/tasks");
  dispatch({ type: types.FETCH_TASKS, payload: res.data });
};

export const newTask = task => async dispatch => {
  const res = await axios.post("/api/tasks", task);

  dispatch({ type: types.NEW_TASK, payload: res.data });
};
