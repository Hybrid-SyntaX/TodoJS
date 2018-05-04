import * as types from "../actions/types";

export default function(state = null, action) {
  console.log(action);

  switch (action.type) {
    case types.FETCH_TASKS:
      return action.payload || false;
    case types.NEW_TASK:
      return [action.payload] || false;
    default:
      return state;
  }
}
