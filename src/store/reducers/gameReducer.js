import uuid from "react-uuid";
import {
  ADD_PLAYER,
  NEXT_ROUND,
  INCREMENT_PLAYER_SCORE,
  DECREMENT_PLAYER_SCORE,
  RESET_GAME,
  CHANGE_PLAYER_NAME,
  DELETE_PLAYER
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
    case DELETE_PLAYER:
      return {
        ...state,
        players: state.players.filter(p => p.id !== action.payload.id),
        history: action.payload.history
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
    case CHANGE_PLAYER_NAME:
      return { ...state, players: action.payload };
    case RESET_GAME:
      return { ...initialState, id: uuid() };
    default:
      return state;
  }
}
