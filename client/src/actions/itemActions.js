import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig, tokenConfig2 } from "./authActions";
import { returnErrors } from "./errorActions";

let isVideo = path => {
  let arr = path.split(".");
  let extension = arr.length > 0 ? arr[arr.length - 1] : "";
  let videoExts = [
    "webm",
    "mov",
    "mpg",
    "mp2",
    "mpeg",
    "mpe",
    "mpv",
    "ogg",
    "mp4",
    "m4p",
    "m4v",
    "avi",
    "wmv",
    "avi",
    "wmv",
    "mov",
    "qt",
    "flv",
    "swf",
    "avchd"
  ];
  return !videoExts.includes(extension) ? false : true;
};

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res => dispatch({ type: GET_ITEMS, payload: res.data }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  console.log("addItem called");
  console.log("addItem item: ", item);

  // Only add the video if the user input is a video path
  axios
    // Attach token to request in the header
    .post("/api/items", item, tokenConfig2(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// This returns to the reducer, and the reducer also needs to know the id when deleting an item, so we include a payload
export const deleteItem = id => (dispatch, getState) => {
  axios
    // Attach token to request in the header
    .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
