import { combineReducers } from "redux";
import gameReducer from "./gameReducer";
import configReducer from "./configReducer";

export default combineReducers({
  game: gameReducer,
  config: configReducer
});
