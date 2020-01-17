import React from "react";
import "./App.scss";
import { Provider } from "react-redux";
import Players from "./components/Players";
import ConfigPanel from "./components/ConfigPanel";
import store from "./store";
import HistoryPanel from "./components/HistoryPanel";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <header className="app__header">
          <ConfigPanel />
          <HistoryPanel />
        </header>
        <Players />
      </div>
    </Provider>
  );
}

export default App;
