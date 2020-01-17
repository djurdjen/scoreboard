import {
  ADD_PLAYER,
  INCREMENT_PLAYER_SCORE,
  DECREMENT_PLAYER_SCORE
} from "./types";

export const addPlayer = player => async dispatch => {
  dispatch({ type: ADD_PLAYER, payload: player });
};

// Little verbose, but obviously written, which is more important
export const incrementPlayerScore = id => (dispatch, getState) => {
  // Returning a new copy of the state, otherwise the component will not update
  const players = JSON.parse(JSON.stringify(getState().game.players));
  const single = players.find(p => p.id === id);
  single.score += 1;
  dispatch({ type: INCREMENT_PLAYER_SCORE, payload: players });
};

export const decrementPlayerScore = id => (dispatch, getState) => {
  const players = JSON.parse(JSON.stringify(getState().game.players));
  const single = players.find(p => p.id === id);
  single.score -= 1;
  dispatch({ type: DECREMENT_PLAYER_SCORE, payload: players });
};
