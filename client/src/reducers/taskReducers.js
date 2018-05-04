import * as types from "../actions/types";
const sortByCreationDate = (a, b) => a.creationDate < b.creationDate;

const updateState = (state, action) => {
  return state
    .filter(t => t._id !== action.payload._id)
    .concat(action.payload)
    .sort(sortByCreationDate);
};
export default function(state = null, action) {
  switch (action.type) {
    case types.FETCH_TASKS:
      return action.payload.sort(sortByCreationDate) || false;
    case types.READ_TASK: //TEMPORARILY
      return updateState(state, action);
    case types.UPDATE_TASK:
      return updateState(state, action);
      break;
    case types.NEW_TASK:
      return state.concat([action.payload]).sort(sortByCreationDate);
    case types.DELETE_TASK:
      return state
        .filter(t => t._id !== action.payload._id)
        .sort(sortByCreationDate);
    case types.DO_TASK:
      return updateState(state, action);
    case types.UNDO_TASK:
      return updateState(state, action);

    default:
      return state;
  }
}
