import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  SET_SELECTED_ITEM_ONE,
  SET_SELECTED_ITEM_TWO,
  SET_ITEM_ONE_RANGE,
  SET_ITEM_TWO_RANGE
} from "../actions/types";

const initialState = {
  selectItemOne: null,
  selectItemTwo: null,
  videoOneSelection: [],
  videoTwoSelection: [],
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      console.log(action.payload.data, "wee");
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_SELECTED_ITEM_ONE:
      return {
        ...state,
        selectItemOne: action.payload
      };

    case SET_SELECTED_ITEM_TWO:
      console.log(action.payload);
      return {
        ...state,
        selectItemTwo: action.payload
      };
    case SET_ITEM_ONE_RANGE:
      return {
        ...state,
        videoOneSelection: action.payload
      };
    case SET_ITEM_TWO_RANGE:
      return {
        ...state,
        videoTwoSelection: action.payload
      };

    // doesn't need
    // case GET_SELECTED_ITEM:
    //   return {
    //     ...state
    //   };
    default:
      return state;
  }
}
