import {
  MERGE_CLIP, SET_DURATION, SET_SYNC,
  TRIM_CLIP
} from "../actions/types";
  
  const initialState = {
    items: [],
    sync: false,
    duration: 0.
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
      default:
        return state;
    }
  }
  