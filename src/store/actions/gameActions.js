import {
  ADD_PLAYER,
  DELETE_PLAYER,
  INCREMENT_PLAYER_SCORE,
  DECREMENT_PLAYER_SCORE,
  CHANGE_PLAYER_NAME,
  NEXT_ROUND,
  RESET_GAME,
  TOGGLE_SETTINGS
} from "./types";

export const addPlayer = player => async (dispatch, getState) => {
  dispatch({ type: ADD_PLAYER, payload: player });
  localStorage.setItem("currentGame", JSON.stringify(getState().game));
};
export const deletePlayer = id => async (dispatch, getState) => {
  dispatch({
    type: DELETE_PLAYER,
    payload: {
      id,
      history: JSON.parse(JSON.stringify(getState())).game.history.map(h => {
        if (id in h) {
          // prevent skipping if score = 0
          delete h[id]; // also remove player history
        }
        return h;
      })
    }
  });
  localStorage.setItem("currentGame", JSON.stringify(getState().game));
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

export const nextRound = round => (dispatch, getState) => {
  dispatch({ type: NEXT_ROUND, payload: round });
  localStorage.setItem("currentGame", JSON.stringify(getState().game));
};

export const resetGame = () => dispatch => {
  dispatch({ type: RESET_GAME });
  dispatch({ type: TOGGLE_SETTINGS });
  localStorage.removeItem("currentGame");
};

export const changePlayerName = val => (dispatch, getState) => {
  const players = JSON.parse(JSON.stringify(getState().game.players));
  const single = players.find(p => p.id === val.id);
  single.name = val.name;
  dispatch({ type: CHANGE_PLAYER_NAME, payload: players });
  localStorage.setItem("currentGame", JSON.stringify(getState().game));
};
