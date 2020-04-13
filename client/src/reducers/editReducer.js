import {
  ADD_CAPTION,
  DELETE_CAPTION,
  RESET_CAPTION,
  SET_CAPTION,
  SET_DURATION_ONE,
  SET_DURATION_TWO,
  SET_SYNC,
  ENABLE_CAPTION,
  ENABLE_USERGUIDE,
  SET_PROGRESS,
  SET_LOADING,
  SET_FILENAME
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
  isLoading: false,
  newFileName: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
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
    case SET_FILENAME: {
      return {
        ...state,
        newFileName: action.payload
      }
    }
    default:
      return state;
  }
}
