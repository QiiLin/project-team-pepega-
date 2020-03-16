import {
  ADD_CAPTION,
  MERGE_CLIP, RESET_CAPTION, SET_CAPTION, SET_DURATION, SET_SYNC,
  TRIM_CLIP
} from "../actions/types";
  
  const initialState = {
    items: [],
    sync: false,
    duration: 0,
    captions: [],
    captionValue: ""
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case MERGE_CLIP:
        return {
          ...state,
          items: action.payload
        };
      case TRIM_CLIP:
        return {
          ...state,
          items: action.payload
        };
      case SET_SYNC:
        return {
          ...state,
          sync: !state.sync
        };
      case SET_DURATION:
        return {
        ...state,
        duration: action.payload
      };
      case ADD_CAPTION:
        return {
          ...state,
          captions:  [action.payload, ...state.captions]
        };
      case SET_CAPTION:
        return {
          ...state,
          captionValue: action.payload
        };
      case RESET_CAPTION:
        return {
          ...state,
          captions: []
        };
      default:
        return state;
    }
  }
  