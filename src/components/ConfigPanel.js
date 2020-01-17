import React, { Component } from "react";
import { connect } from "react-redux";
import { setTally, toggleSettings } from "../store/actions/configActions";
import { resetGame } from "../store/actions/gameActions";
import Toggle from "./Toggle";

// load the images fro pwa cache
import gearWhite from "../img/gear-white.svg";
import gear from "../img/gear.svg";
import "./ConfigPanel.scss";

class ConfigPanel extends Component {
  render() {
    return (
      <div className="config-panel">
        <button
          className={`config-panel__toggle ${
            this.props.settingsToggled ? "config-panel__toggle--active" : ""
          }`}
          style={{
            backgroundImage: `url(${
              this.props.settingsToggled ? gear : gearWhite
            })`
          }}
          onClick={this.props.toggleSettings}
        ></button>
        <div
          className={`config-panel__wrapper ${
            this.props.settingsToggled ? "config-panel__wrapper--active" : ""
          }`}
        >
          <div className="config-panel__container">
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
              <button
                onClick={this.props.resetGame}
                className="config-panel__reset"
              >
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
