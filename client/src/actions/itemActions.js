import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItems = () => dispatch => {
  //   return {
  //     type: GET_ITEMS
  //   };
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res => dispatch({ type: GET_ITEMS, payload: res.data }))
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = item => (dispatch, getState) => {
  //   return {
  //     type: ADD_ITEM,
  //     payload: item
  //   };
  axios
    // Attach token to request in the header
    .post("/api/items", item, tokenConfig(getState))
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
  //   return {
  //     type: DELETE_ITEM,
  //     payload: id
  //   };
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
