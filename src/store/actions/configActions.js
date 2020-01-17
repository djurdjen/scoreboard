import {
  SET_TALLY,
  SET_EDITING_MODE,
  TOGGLE_SETTINGS,
  TOGGLE_HISTORY
} from "./types";

export const setTally = () => async (dispatch, getState) => {
  dispatch({ type: SET_TALLY, payload: !getState().config.tally });
};
export const setEditingMode = bool => async dispatch => {
  dispatch({ type: SET_EDITING_MODE, payload: bool });
};
export const toggleSettings = () => async dispatch => {
  dispatch({ type: TOGGLE_SETTINGS });
};
export const toggleHistory = () => async dispatch => {
  dispatch({ type: TOGGLE_HISTORY });
};
