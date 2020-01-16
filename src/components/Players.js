import React, { Component } from "react";
import { connect } from "react-redux";
import { addPlayer } from "../store/actions/gameActions";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayerInput: {
        name: ""
      }
    };
    this.setValue = this.setValue.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  setValue(e) {
    this.setState({
      newPlayerInput: {
        ...this.state.newPlayerInput,
        [e.target.name]: e.target.value
      }
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    if (
      this.props.players.find(p => p.name === this.state.newPlayerInput.name)
    ) {
      alert("Player needs to be unique");
      return;
    }
    if (!this.state.newPlayerInput.name) {
      alert("Name can not be empty");
      return;
    }
    this.props.addPlayer(this.state.newPlayerInput);
    this.setState({ newPlayerInput: { name: "" } });
  }
  render() {
    return (
      <div className="players">
        {this.props.players.map((player, key) => (
          <div>
            <strong>{player.name}</strong>
          </div>
        ))}
        <form onSubmit={this.onFormSubmit}>
          <label>
            New player:
            <input
              type="text"
              name="name"
              value={this.state.newPlayerInput.name}
              onChange={this.setValue}
            />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  players: state.game.players
});
export default connect(mapStateToProps, { addPlayer })(Players);
