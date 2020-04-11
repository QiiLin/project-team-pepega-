import axios from "axios";
import {
    SET_SYNC,
    SET_DURATION_ONE,
    SET_DURATION_TWO,
    ADD_CAPTION,
    SET_CAPTION,
    RESET_CAPTION,
    DELETE_CAPTION,
    ENABLE_CAPTION,
    ENABLE_USERGUIDE,
    SET_FILENAME,
    SET_LOADING,
    SET_PROGRESS,
    MERGE_CLIP,
    TRIM_CLIP,
    ADD_CHROMA,
    SAVE_RECORDING,
} from "./types";
import { tokenConfig, tokenConfig2 } from "./authActions";
import { returnErrors } from "./errorActions";
import { getItems } from "./itemActions";

export const mergeClip = (ids, filename) => (dispatch, getState) => {
    // for (var pair of ids.entries()) {
    //     console.log(pair[0] + ", " + pair[1]);
    // }
    dispatch(setProgress());
    dispatch(setLoading());

    axios
    // Attach token to request in the header
        .post("/api/edit/merge", ids, tokenConfig2(getState), {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => {
            dispatch(getItems());
            dispatch(setLoading());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const captionClip = (id, data, filename) => (dispatch, getState) => {
    let body = {
        data: data,
        filename: filename
    };
    dispatch(setProgress());
    dispatch(setLoading());
    axios
    // Attach token to request in the header
        .post("/api/edit/caption/" + id, body, tokenConfig(getState))
        .then(res => {
            // reset the caption list
            dispatch(resetCaptions());
            dispatch(setEnableCap());
            dispatch(getItems());
            dispatch(setLoading());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const trimClip = (id, body) => (dispatch, getState) => {
    dispatch(setProgress());
    dispatch(setLoading());
    axios
    // Attach token to request in the header
        .post(`/api/edit/trim/${id}`, body, tokenConfig2(getState), {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res => 
            {
                dispatch(getItems());
                dispatch(setLoading());
            })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const transitionClip = (id, data) => (dispatch, getState) => {
    dispatch(setProgress());
    dispatch(setLoading());
    axios
        .post(`/api/edit/transition/${id}`, data, tokenConfig2(getState), {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res =>    {
            dispatch(getItems());
            dispatch(setLoading());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const addChroma = (id, data) => (dispatch, getState) => {
    dispatch(setProgress());
    dispatch(setLoading());
    console.log("addChroma editAction");
    console.log(id, data);
    axios
        .post(`/api/edit/chroma/${id}`, data, tokenConfig2(getState), {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(res =>    {
            dispatch(getItems());
            dispatch(setLoading());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const saveMP3 = (data) => (dispatch, getState) => {
  console.log("file: ", data)
  axios
    .post(`/api/edit/saveMP3`, data, tokenConfig2(getState), {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => dispatch(getItems()))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const addAudToVid = (id, data) => (dispatch, getState) => {
  axios
    .post(`/api/edit/addAudToVid/${id}`, data, tokenConfig2(getState), {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    .then(res => dispatch(getItems()))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// export const addAudToVid = (id, data) => (dispatch, getState) => {
//   console.log("addAudToVid editAction");
//   axios
//     .post(`/api/edit/addAudToVid/${id}`, data, tokenConfig2(getState), {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     })
//     .then(res => dispatch(getItems()))
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//     });
// }

export const set_sync = () => {
    return {
        type: SET_SYNC
    };
};

export const setProgress = () => {
    console.log("wqe");
    return {
        type: SET_PROGRESS
    }
}

export const setLoading = () => {
    console.log("load updated")
    return {
        type: SET_LOADING
    }
}
export const setEnableCap = () => {
    return {
        type: ENABLE_CAPTION
    }
};
export const setEnableGuide = () => {
    return {
        type: ENABLE_USERGUIDE
    }
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

export const setFilename = filename => {
    console.log(filename)
    return {
        type: SET_FILENAME,
        payload: filename
    }
}

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
export const resetCaptions = () => {
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