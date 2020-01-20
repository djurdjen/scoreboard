import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import Players from "./components/Players";
import ConfigPanel from "./components/ConfigPanel";
import store from "./store";
import HistoryPanel from "./components/HistoryPanel";
import { TOGGLE_ALL_FALSE } from "./store/actions/types";
function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app__header">
          <strong
            onClick={() => {
              store.dispatch({ type: TOGGLE_ALL_FALSE });
            }}
            className="app__header-name"
          >
            Scoreboard
          </strong>
          <ConfigPanel />
          <HistoryPanel />
        </header>
        <Players />
      </div>
    </Provider>
  );
}

export default App;
