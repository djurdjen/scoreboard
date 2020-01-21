import {
  SET_TALLY,
  SET_EDITING_MODE,
  TOGGLE_HISTORY,
  TOGGLE_SETTINGS,
  TOGGLE_ALL_FALSE,
  TOGGLE_DELETE_STATE
} from "../actions/types";

const initialState = {
  editing: false,
  tally: false,
  historyToggled: false,
  settingsToggled: false,
  deleteState: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_TALLY:
      return { ...state, tally: action.payload };
    case TOGGLE_DELETE_STATE:
      return {
        ...state,
        deleteState: !state.deleteState,
        settingsToggled: false,
        historyToggled: false
      };
    case TOGGLE_HISTORY:
      return {
        ...state,
        historyToggled: !state.historyToggled,
        settingsToggled: false,
        deleteState: false
      };
    case TOGGLE_SETTINGS:
      return {
        ...state,
        settingsToggled: !state.settingsToggled,
        historyToggled: false,
        deleteState: false
      };
    case TOGGLE_ALL_FALSE:
      return {
        ...state,
        settingsToggled: false,
        historyToggled: false,
        deleteState: false
      };
    case SET_EDITING_MODE:
      return { ...state, editing: action.payload };
    default:
      return state;
  }
}
