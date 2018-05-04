import * as types from "../actions/types";

export default function(state = null, action) {
  console.log("ACTION:", action);
  console.log("STATE:", state);

  switch (action.type) {
    case types.FETCH_TASKS:
      return action.payload || false;
    case types.UPDATE_TASK:
      //console.log("**UPDATE TASK REDUCED");
      //TEMP SOLUTION
      //var index = state.findIndex(t => t._id === action.payload._id);
      //console.log(index);
      //return state.splice(index, 0, action.payload);
      //state[index] = action.payload;

      //return state;
      return state
        .filter(t => t._id !== action.payload._id)
        .concat(action.payload);
      break;
    case types.NEW_TASK:
      return state.concat([action.payload]);
    case types.DELETE_TASK:
      return state.filter(t => t._id !== action.payload._id);

    case types.DO_TASK:
      return state
        .filter(t => t._id !== action.payload._id)
        .concat(action.payload);
    case types.UNDO_TASK:
      return state
        .filter(t => t._id !== action.payload._id)
        .concat(action.payload);

    default:
      return state;
  }
}
