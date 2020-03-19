import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  SET_SELECTED_ITEM_ONE,
  SET_SELECTED_ITEM_TWO,
  SET_ITEM_ONE_RANGE,
  SET_ITEM_TWO_RANGE
} from "./types";
import { tokenConfig, tokenConfig2 } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => (dispatch, getState) => {
  setTimeout(function() {
    console.log("invoke");
    dispatch(setItemsLoading());
    axios
      .get("/api/items", tokenConfig2(getState))
      .then(res => {
        console.log(res.data);
        dispatch({ type: GET_ITEMS, payload: res.data });
        console.log("did");
      })
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  }, 500);
};

export const addItem = item => (dispatch, getState) => {
  console.log("addItem called");
  console.log("addItem item: ", item);

  // Only add the video if the user input is a video path
  axios
    // Attach token to request in the header
    .post("/api/items/upload", item, tokenConfig2(getState))
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
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
  console.log(range);
  return {
    type: SET_ITEM_ONE_RANGE,
    payload: range
  };
};
export const setVideoTwoRange = range => {
  console.log("setVideoTwoRange: ", range);
  return {
    type: SET_ITEM_TWO_RANGE,
    payload: range
  };
};
