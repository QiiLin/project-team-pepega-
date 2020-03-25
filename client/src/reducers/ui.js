import { SET_PROGRESS_BAR } from "../actions/types";

export const ui = (state = {}, action) => {
  console.log("ui reducer");
  console.log("action.type: ", action.type);
  switch (action.type) {
    case SET_PROGRESS_BAR:
      console.log("ui reducer case");
      return Object.assign({}, state, { progressBarStatus: action.isOpen });
    default:
      return state;
  }
};

export default ui;
