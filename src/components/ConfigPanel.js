import React, { Component } from "react";
import { connect } from "react-redux";
import { setTally } from "../store/actions/configActions";
import Toggle from "./Toggle";

// load the images fro pwa cache
import gearWhite from "../img/gear-white.svg";
import gear from "../img/gear.svg";
import "./ConfigPanel.scss";

class ConfigPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pannelActive: false
    };
    this.toggleConfigPanel = this.toggleConfigPanel.bind(this);
  }
  toggleConfigPanel() {
    this.setState({ pannelActive: !this.state.pannelActive });
  }

  render() {
    return (
      <div className="config-panel">
        <button
          className={`config-panel__toggle ${
            this.state.pannelActive ? "config-panel__toggle--active" : ""
          }`}
          style={{
            backgroundImage: `url(${
              this.state.pannelActive ? gearWhite : gear
            })`
          }}
          onClick={this.toggleConfigPanel}
        ></button>
        <div
          className={`config-panel__wrapper ${
            this.state.pannelActive ? "config-panel__wrapper--active" : ""
          }`}
        >
          <div className="config-panel__container">
            <div className="config-panel__option-toggle">
              <span className="toggle-label">Use tally scores</span>
              <Toggle
                isChecked={this.props.tally}
                change={this.props.setTally}
              ></Toggle>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tally: state.config.tally
});
export default connect(mapStateToProps, { setTally })(ConfigPanel);
