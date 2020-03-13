import {
    MERGE_CLIP,
    TRIM_CLIP
  } from "../actions/types";
  
  const initialState = {
    items: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case MERGE_CLIP:
        return {
          ...state,
          items: action.payload,
          loading: false
        };
      case TRIM_CLIP:
        return {
          ...state,
          items: state.items.filter(item => item._id !== action.payload)
        };
      default:
        return state;
    }
  }
  