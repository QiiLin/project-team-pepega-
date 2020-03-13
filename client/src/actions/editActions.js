import axios from "axios";
import { MERGE_CLIP, TRIM_CLIP } from "./types";
import { tokenConfig, tokenConfig2 } from "./authActions";
import { returnErrors } from "./errorActions";

export const mergeClip = ids => (dispatch, getState) => {
  console.log("mergeItem called");
  console.log("mergeItem ids: ", ids);

  // Only add the video if the user input is a video path
  axios
    // Attach token to request in the header
    .post("/api/edit/merge/", ids, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: MERGE_CLIP,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const trimClip = () => dispatch => {

};
