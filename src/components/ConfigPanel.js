import React, { Component } from "react";
import { connect } from "react-redux";
import { setTally, toggleSettings } from "../store/actions/configActions";
import { resetGame } from "../store/actions/gameActions";
import Toggle from "./Toggle";

import Gear from "../icons/gear";
import "./ConfigPanel.scss";

class ConfigPanel extends Component {
  constructor() {
    super();
    this.resetGame = this.resetGame.bind(this);
  }
  resetGame() {
    const answer = window.confirm("Are you sure you want to reset your game?");
    if (answer) {
      this.props.resetGame();
    } else {
      return;
    }
  }
  render() {
    return (
      <div className="config-panel">
        <button
          className={`config-panel__toggle ${
            this.props.settingsToggled ? "config-panel__toggle--active" : ""
          }`}
          onClick={this.props.toggleSettings}
        >
          <Gear color={this.props.settingsToggled ? "#4b4ba7" : "#ffffff"} />
        </button>
        <div
          className={`config-panel__wrapper ${
            this.props.settingsToggled ? "config-panel__wrapper--active" : ""
          }`}
        >
          <div className="config-panel__container">
            <h1>Settings</h1>
            <div className="config-panel__option">
              <div className="config-panel__option-toggle">
                <span className="toggle-label">Use tally scores</span>
                <Toggle
                  isChecked={this.props.tally}
                  change={this.props.setTally}
                ></Toggle>
              </div>
            </div>
            <div className="config-panel__option">
              <button onClick={this.resetGame} className="config-panel__reset">
                Reset game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tally: state.config.tally,
  settingsToggled: state.config.settingsToggled
});
export default connect(mapStateToProps, {
  setTally,
  resetGame,
  toggleSettings
})(ConfigPanel);
