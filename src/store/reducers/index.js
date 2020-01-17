import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import roundReducer from "./roundReducer";
import configReducer from "./configReducer";

export default combineReducers({
  game: gameReducer,
  rounds: roundReducer,
  config: configReducer
});
