import {
    MERGE_CLIP,
    TRIM_CLIP
  } from "../actions/types";
  
  const initialState = {
    items: []
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
      default:
        return state;
    }
  }
  