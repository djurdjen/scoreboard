import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import middleware from "./middleware";

const savedState = JSON.parse(localStorage.getItem("currentGame"));
const store = createStore(
  rootReducer,
  savedState ? { game: JSON.parse(localStorage.getItem("currentGame")) } : {},
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //init devtools extension
  )
);

export default store;
