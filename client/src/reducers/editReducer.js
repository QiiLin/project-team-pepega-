import {
  ADD_CAPTION,
  DELETE_CAPTION,
  MERGE_CLIP,
  RESET_CAPTION,
  SET_CAPTION,
  SET_DURATION_ONE,
  SET_DURATION_TWO,
  SET_SYNC,
  TRIM_CLIP,
  TRANSITION_CLIP,
  ADD_CHROMA,
  ENABLE_CAPTION,
  ENABLE_USERGUIDE,
  SET_PROGRESS,
  SET_LOADING
} from "../actions/types";

/*
1
00:00:00,000 --> 00:00:10,000
This is test file

 */
const initialState = {
  items: [],
  sync: false,
  durationVideoOne: 0,
  durationVideoTwo: 0,
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
  captionValue: "",
  isWanted: false,
  isUserGuide: false,
  isProgress: false,
  isLoading: false
};

export default function(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case MERGE_CLIP:
      return {
        ...state,
        items: action.payload
      };
    case TRIM_CLIP:
      console.log("editReducer trimclip: ", action.payload);
      return {
        ...state,
        items: action.payload
      };
    case TRANSITION_CLIP:
      console.log("editReducer transition: ", action.payload);
      return {
        ...state,
        items: action.payload
      };
    case SET_SYNC:
      return {
        ...state,
        sync: !state.sync
      };
    case SET_DURATION_ONE:
      return {
        ...state,
        durationVideoOne: action.payload
      };
    case SET_DURATION_TWO:
      return {
        ...state,
        durationVideoTwo: action.payload
      };
    case ADD_CHROMA:
      console.log("Got to editReducer");
      return {
        ...state,
        items: action.payload
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
    case ENABLE_CAPTION: {
      return {
        ...state,
        isWanted: !state.isWanted
      }
    }
    case ENABLE_USERGUIDE: {
      return {
        ...state,
        isUserGuide: !state.isUserGuide
      }
    }
    case SET_PROGRESS: {
      return {
        ...state,
        isProgress: !state.isProgress
      }
    }
    case SET_LOADING: {
      return {
        ...state,
        isLoading: ! state.isLoading
      }
    }
    default:
      return state;
  }
}
