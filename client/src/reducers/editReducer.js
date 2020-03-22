import {
  ADD_CAPTION,
  DELETE_CAPTION,
  MERGE_CLIP,
  RESET_CAPTION,
  SET_CAPTION,
  SET_DURATION,
  SET_DURATION_2,
  SET_SYNC,
  TRIM_CLIP
} from "../actions/types";

/*
1
00:00:00,000 --> 00:00:10,000
This is test file

 */
const initialState = {
  items: [],
  sync: false,
  duration: 0,
  captions: [
    //     {
    //     start_time: "00:00:01,000",
    //     end_time: "00:00:04,000",
    //     text: "1---------------4"
    // }, {
    //     start_time: "000:00:06,000",
    //     end_time: "00:00:10,000",
    //     text: "6 ---------10"
    // }, {
    //     start_time: "00:00:12,000",
    //     end_time: "00:00:17,000",
    //     text: "12 ------17"
    // }
  ],
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
    case SET_DURATION_2:
      return {
        ...state,
        duration: action.payload
      };
    case ADD_CAPTION:
      return {
        ...state,
        captions: [action.payload, ...state.captions]
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
    case DELETE_CAPTION: {
      return {
        ...state,
        captions: state.captions.filter(item => item.index !== action.payload)
      };
    }
    default:
      return state;
  }
}
