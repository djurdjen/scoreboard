import uuid from "react-uuid";
import { ADD_PLAYER, SET_GAME_NAME } from "../actions/types";

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
        players: [...state.players, { ...action.payload, id: uuid() }]
      };
    case SET_GAME_NAME:
      return { ...state, name: action.payload };
    default:
      return state;
  }
}
