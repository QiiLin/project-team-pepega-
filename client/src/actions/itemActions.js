import axios from "axios";
import {
  GET_ITEMS,
  DELETE_ITEM,
  ITEMS_LOADING,
  SET_SELECTED_ITEM_ONE,
  SET_SELECTED_ITEM_TWO,
  SET_ITEM_ONE_RANGE,
  SET_ITEM_TWO_RANGE,
  SET_PROGRESS_BAR
} from "./types";
import { tokenConfig, tokenConfig2 } from "./authActions";
import { returnErrors } from "./errorActions";

/**
 * This function is getting all the file from
 * the backend and display it
 */
export const getItems = () => (dispatch, getState) => {
  dispatch(setItemsLoading());
  axios
    .get("/api/items", tokenConfig2(getState))
    .then(res => {
      console.log(res.data);
      dispatch({ type: GET_ITEMS, payload: res.data });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

/**
 * This function is adding 
 * the backend and display it
 */
export const addItem = item => (dispatch, getState) => {
  // Only add the video if the user input is a video path
  axios
    // Attach token to request in the header
    .post("/api/items/upload", item, tokenConfig2(getState))
    .then(res => {
      dispatch(getItems());
    })
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

export const setSelectItemOne = id => {
  return {
    type: SET_SELECTED_ITEM_ONE,
    payload: id
  };
};
export const setSelectItemTwo = id => {
  return {
    type: SET_SELECTED_ITEM_TWO,
    payload: id
  };
};

export const setVideoOneRange = range => {
  return {
    type: SET_ITEM_ONE_RANGE,
    payload: range
  };
};
export const setVideoTwoRange = range => {
  return {
    type: SET_ITEM_TWO_RANGE,
    payload: range
  };
};
export const setProgressBar = isOpen => ({
  type: SET_PROGRESS_BAR,
  isOpen: isOpen
});
