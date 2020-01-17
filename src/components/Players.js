import React, { Component } from "react";
import { connect } from "react-redux";
import Score from "./Score.js";
import {
  addPlayer,
  incrementPlayerScore,
  decrementPlayerScore
} from "../store/actions/gameActions";
import "./Players.scss";

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
          <div key={player.id} className="players__single">
            <div className="players__single-data">
              <strong className="player-name">{player.name}</strong>
              <Score score={player.score} />
            </div>
            <div className="players__single-interaction">
              <button
                className="players__single-btn players__single-btn--decrement"
                onClick={() => this.props.decrementPlayerScore(player.id)}
              ></button>
              <button
                className="players__single-btn players__single-btn--increment"
                onClick={() => this.props.incrementPlayerScore(player.id)}
              ></button>
            </div>
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
export default connect(mapStateToProps, {
  addPlayer,
  incrementPlayerScore,
  decrementPlayerScore
})(Players);
