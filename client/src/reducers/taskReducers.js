import { FETCH_TASKS } from "../actions/types";

export default function(state = null, action) {
  console.log(action);

  switch (action.type) {
    case FETCH_TASKS:
      return action.payload || false;
    default:
      return state;
  }
}
