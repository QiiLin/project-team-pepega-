import axios from "axios";
import {
  MERGE_CLIP,
  TRIM_CLIP,
  SET_SYNC,
  SET_DURATION_ONE,
  SET_DURATION_TWO,
  ADD_CAPTION,
  SET_CAPTION,
  RESET_CAPTION,
  DELETE_CAPTION
} from "./types";
import { tokenConfig, tokenConfig2 } from "./authActions";
import { returnErrors } from "./errorActions";
import { getItems } from "./itemActions";

export const mergeClip = ids => (dispatch, getState) => {
  for (var pair of ids.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  axios
    // Attach token to request in the header
    .post("/api/edit/merge", ids, tokenConfig2(getState), {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => dispatch(getItems()))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const captionClip = (id, data) => (dispatch, getState) => {
  let body = {
    data: data
  };
  axios
    // Attach token to request in the header
    .post("/api/edit/caption/" + id, body, tokenConfig(getState))
    .then(res => {
      // reset the caption list
      dispatch({
        type: RESET_CAPTION,
        payload: res.data
      });
      dispatch(getItems());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const trimClip = (id, body) => (dispatch, getState) => {
  // console.log("trimClip called");
  // for (var pair of body.entries()) {
  //   console.log(pair[0]+ ', ' + pair[1]);
  // }
  // console.log(id);

  console.log("id: ", id);
  console.log("body: ", body);
  axios
    // Attach token to request in the header
    .post(`/api/edit/trim/${id}`, body, tokenConfig2(getState), {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => dispatch(getItems()))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const transitionClip = (id, data) => (dispatch, getState) => {
  console.log("id: ", id);
  console.log("data: ", data.get("transitionType"));
  axios
    .post(`/api/edit/transition/${id}`, data, tokenConfig2(getState), {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => dispatch(getItems()))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const set_sync = () => {
  return {
    type: SET_SYNC
  };
};

export const setDurationOne = video_length => {
  return {
    type: SET_DURATION_ONE,
    payload: video_length
  };
};

export const setDurationTwo = video_length => {
  return {
    type: SET_DURATION_TWO,
    payload: video_length
  };
};

export const addCapation = item => {
  return {
    type: ADD_CAPTION,
    payload: item
  };
};

export const setCaption = item => {
  return {
    type: SET_CAPTION,
    payload: item
  };
};
export const resetCaptions = cap => {
  return {
    type: RESET_CAPTION
  };
};

export const deleteCaption = index => {
  return {
    type: DELETE_CAPTION,
    payload: index
  };
};
