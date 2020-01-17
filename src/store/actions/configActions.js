import { SET_TALLY, SET_EDITING_MODE } from "./types";

export const setTally = () => async (dispatch, getState) => {
  dispatch({ type: SET_TALLY, payload: !getState().config.tally });
};
export const setEditingMode = bool => async dispatch => {
  dispatch({ type: SET_EDITING_MODE, payload: bool });
};
