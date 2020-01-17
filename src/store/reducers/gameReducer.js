import uuid from "react-uuid";
import {
  ADD_PLAYER,
  SET_GAME_NAME,
  INCREMENT_PLAYER_SCORE,
  DECREMENT_PLAYER_SCORE
} from "../actions/types";

const initialState = {
  name: "New game",
  players: [],
  id: null,
  started: new Date()
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

    case SET_GAME_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}
