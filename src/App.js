import React, { Component } from "react";
import "./App.scss";
import { Provider } from "react-redux";
import Players from "./components/Players";
import ConfigPanel from "./components/ConfigPanel";
import DeletePanel from "./components/DeletePanel";
import store from "./store";
import HistoryPanel from "./components/HistoryPanel";
import Offline from "./icons/offline";
import Home from "./icons/home";
import { TOGGLE_ALL_FALSE } from "./store/actions/types";

class App extends Component {
  constructor() {
    super();
    this.state = {
      offline: !navigator.onLine
    };
  }
  componentDidMount() {
    window.addEventListener("online", this.setOfflineStatus);
    window.addEventListener("offline", this.setOfflineStatus);
  }
  componentWillUnmount() {
    window.removeEventListener("online", this.setOfflineStatus);
    window.removeEventListener("offline", this.setOfflineStatus);
  }
  setOfflineStatus = () => {
    this.setState({ offline: !navigator.onLine });
  };
  render() {
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
              <span className="app__home">
                <Home color={"#ffffff"} />
              </span>
              {this.state.offline && (
                <span className="app__offline">
                  <Offline color={"#dc6363"} />
                </span>
              )}
            </strong>
            <ConfigPanel />
            <HistoryPanel />
            <DeletePanel />
          </header>
          <Players />
        </div>
      </Provider>
    );
  }
}

export default App;
