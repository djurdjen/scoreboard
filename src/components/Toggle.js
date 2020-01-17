// https://codepen.io/voidale/pen/EWPGLb
import React, { Component } from "react";
import "./Toggle.scss";

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: props.isChecked || false
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange() {
    this.setState({ isChecked: !this.state.isChecked });
    this.props.change(!this.state.isChecked);
  }
  render() {
    console.log(this.props.isChecked);
    return (
      <label className="switch">
        <input
          type="checkbox"
          checked={this.state.isChecked}
          value={this.state.isChecked}
          onChange={this.handleChange}
        />
        <div className="slider"></div>
      </label>
    );
  }
}

export default Toggle;
