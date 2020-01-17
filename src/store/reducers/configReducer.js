import { SET_TALLY, SET_EDITING_MODE } from "../actions/types";

const initialState = {
  editing: false,
  tally: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TALLY:
      return { ...state, tally: action.payload };
    case SET_EDITING_MODE:
      return { ...state, editing: action.payload };
    default:
      return state;
  }
}
