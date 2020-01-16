import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import Players from "./components/Players";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Players />
      </div>
    </Provider>
  );
}

export default App;
