import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import middleware from "./middleware";

const savedState = JSON.parse(localStorage.getItem("currentGame"));
let middlwareComposition = null;
if (process.env.NODE_ENV === "development") {
  middlwareComposition = compose(
    applyMiddleware(...middleware),

    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //init devtools extension
  );
} else {
  middlwareComposition = compose(applyMiddleware(...middleware));
}
const store = createStore(
  rootReducer,
  savedState ? { game: JSON.parse(localStorage.getItem("currentGame")) } : {},
  middlwareComposition
);

export default store;
