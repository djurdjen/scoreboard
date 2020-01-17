import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import middleware from "./middleware";

const savedState = JSON.parse(localStorage.getItem("store"));
const store = createStore(
  rootReducer,
  {},
  // savedState ? { game: JSON.parse(localStorage.getItem("store")) } : {},
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //init devtools extension
  )
);

// store.subscribe(param => {
//   localStorage.setItem("store", JSON.stringify(store.getState().game));
// });

export default store;
