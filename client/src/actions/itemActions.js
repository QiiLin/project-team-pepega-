import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";

export const getItems = () => dispatch => {
  //   return {
  //     type: GET_ITEMS
  //   };
  dispatch(setItemsLoading());
  axios
    .get("/api/items")
    .then(res => dispatch({ type: GET_ITEMS, payload: res.data }));
};

export const addItem = item => dispatch => {
  //   return {
  //     type: ADD_ITEM,
  //     payload: item
  //   };
  axios.post("/api/items", item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};

// This returns to the reducer, and the reducer also needs to know the id when deleting an item, so we include a payload
export const deleteItem = id => dispatch => {
  //   return {
  //     type: DELETE_ITEM,
  //     payload: id
  //   };
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
