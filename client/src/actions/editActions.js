import axios from "axios";
import { MERGE_CLIP, TRIM_CLIP } from "./types";
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

export const trimClip = () => dispatch => {

};
