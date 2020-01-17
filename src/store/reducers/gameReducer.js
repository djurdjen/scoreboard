import uuid from "react-uuid";
import {
  ADD_PLAYER,
  SET_GAME_NAME,
  NEXT_ROUND,
  INCREMENT_PLAYER_SCORE,
  DECREMENT_PLAYER_SCORE,
  RESET_GAME
} from "../actions/types";

const initialState = {
  name: "New game",
  players: [],
  id: uuid(),
  started: new Date(),
  history: [],
  round: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, { ...action.payload, score: 0, id: uuid() }]
      };
    case INCREMENT_PLAYER_SCORE:
      return { ...state, players: action.payload };

    case DECREMENT_PLAYER_SCORE:
      return { ...state, players: action.payload };
    case NEXT_ROUND:
      return {
        ...state,
        round: state.round + 1,
        history: [...state.history, action.payload]
      };
    case SET_GAME_NAME:
      return { ...state, name: action.payload };
    case RESET_GAME:
      return { ...initialState };
    default:
      return state;
  }
}
