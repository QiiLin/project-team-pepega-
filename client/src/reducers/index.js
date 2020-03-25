import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import editReducer from "./editReducer";
import ui from "./ui";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
  edit: editReducer,
  ui: ui
});
