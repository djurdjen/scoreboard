import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import roundReducer from "./roundReducer";

export default combineReducers({
  game: gameReducer,
  rounds: roundReducer
});
