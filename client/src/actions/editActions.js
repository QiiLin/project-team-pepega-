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
    SET_PROGRESS
} from "./types";
import { tokenConfig, tokenConfig2 } from "./authActions";
import { returnErrors } from "./errorActions";
import { getItems } from "./itemActions";

export const mergeClip = (id, uploader_id, merge_vid_id, filename) => (dispatch, getState) => {
    let body = {
        uploader_id: uploader_id,
        merge_vid_id: merge_vid_id,
        filename: filename
    };
    dispatch(setProgress());
    dispatch(setLoading());

    axios
    // Attach token to request in the header
        .post(`/api/edit/merge/${id}`, body, tokenConfig(getState))
        .then(() => {
            dispatch(getItems());
            dispatch(setLoading());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const captionClip = (id, uploader_id, data, filename) => (dispatch, getState) => {
    let body = {
        uploader_id: uploader_id,
        data: data,
        filename: filename
    };
    dispatch(setProgress());
    dispatch(setLoading());
    axios
    // Attach token to request in the header
        .post(`/api/edit/caption/${id}`, body, tokenConfig(getState))
        .then(() => {
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

export const trimClip = (id, uploader_id, videoSelection, filename) => (dispatch, getState) => {
    let body = {
        uploader_id: uploader_id,
        timestampStart: videoSelection[0],
        timestampEnd: videoSelection[1],
        filename: filename
    };
    dispatch(setProgress());
    dispatch(setLoading());
    axios
    // Attach token to request in the header
        .post(`/api/edit/trim/${id}`, body, tokenConfig(getState))
        .then(() => {
            dispatch(getItems());
            dispatch(setLoading());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const cutClip = (id, uploader_id, videoSelection, filename) => (dispatch, getState) => {
    let body = {
        uploader_id: uploader_id,
        timestampStart: videoSelection[0],
        timestampEnd: videoSelection[1],
        filename: filename
    };
    dispatch(setProgress());
    dispatch(setLoading());
    axios
    // Attach token to request in the header
        .post(`/api/edit/cut/${id}`, body, tokenConfig(getState))
        .then(() => {
            dispatch(getItems());
            dispatch(setLoading());
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
};

export const transitionClip = (id, uploader_id, videoSelection, transitionType, filename) => (dispatch, getState) => {
    let body = {
        uploader_id: uploader_id,
        transitionType: transitionType,
        transitionStartFrame: videoSelection[0],
        transitionEndFrame: videoSelection[1],
        filename: filename
    };
    dispatch(setProgress());
    dispatch(setLoading());
    axios
        .post(`/api/edit/transition/${id}`, body, tokenConfig(getState))
        .then(() => {
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
    .then(() => dispatch(getItems()))
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

export const addCaption = item => {
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