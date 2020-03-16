import axios from "axios";
import {MERGE_CLIP, TRIM_CLIP, SET_SYNC, SET_DURATION, ADD_CAPTION, SET_CAPTION, RESET_CAPTION} from "./types";
import { tokenConfig2} from "./authActions";
import { returnErrors } from "./errorActions";

export const mergeClip = ids => (dispatch, getState) => {
  console.log("mergeItem called");
  for (var pair of ids.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }

  axios
    // Attach token to request in the header
    .post("/api/edit/merge", ids, tokenConfig2(getState), {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res =>
      dispatch({
        type: MERGE_CLIP,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
    });
};

export const captionClip = (id, data) => (dispatch, getState) => {
    axios
    // Attach token to request in the header
        .post("/api/edit/caption/" + id, {
            data: data
        }, tokenConfig2(getState))
        .then(res =>
            dispatch({
                type: MERGE_CLIP,
                payload: res.data
            })
        )
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status))
        });
};

export const trimClip = (id, body) => (dispatch, getState) => {
  console.log("trimClip called");
  for (var pair of body.entries()) {
    console.log(pair[0]+ ', ' + pair[1]); 
  }
  console.log(id);

  axios
    // Attach token to request in the header
    .post(`/api/edit/trim/${id}`, body, tokenConfig2(getState), {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res =>
      dispatch({
        type: TRIM_CLIP,
        payload: res.data
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status))
    });
};

export const set_sync = () => {
    return {
        type: SET_SYNC,
    };
};

export const set_duration =  (video_length) => {
    console.log("testtt", video_length);
    return {
        type: SET_DURATION,
        payload: video_length,
    };
};

export const addCapation = (item) => {
    console.log(item);
  return {
      type: ADD_CAPTION,
      payload: item
  }
};

export const setCaption = (item) => {
    console.log(item);
    return {
        type: SET_CAPTION,
        payload: item
    }
};
export const resetCaptions = (cap) => {
  return {
      type: RESET_CAPTION
  }
};
