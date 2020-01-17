import React, { Component } from "react";
import { connect } from "react-redux";
import Score from "./Score.js";
import {
  addPlayer,
  incrementPlayerScore,
  decrementPlayerScore,
  nextRound
} from "../store/actions/gameActions";
import "./Players.scss";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayerInput: {
        name: ""
      },
      roundHistory: {}
    };
    this.setValue = this.setValue.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.startNewRound = this.startNewRound.bind(this);
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
    this.setState({
      newPlayerInput: { name: "" },
      roundHistory: {
        ...this.state.roundHistory,
        [this.state.newPlayerInput.name]: 0
      }
    });
  }

  changeScore(player, type = "increment") {
    // change score in store
    this.props[
      type === "increment" ? "incrementPlayerScore" : "decrementPlayerScore"
    ](player.id);

    // change score in history settings, create a clean copy with JSON.parse and JSON stringify
    const copy = JSON.parse(JSON.stringify(this.state.roundHistory));
    type === "increment" ? copy[player.name]++ : copy[player.name]--;
    this.setState({
      roundHistory: copy
    });
  }
  startNewRound() {
    this.props.nextRound(this.state.roundHistory);
  }

  render() {
    return (
      <div className="players">
        <div className="players__round">
          <button onClick={this.startNewRound}>New round</button>
          <strong>Round {this.props.round}</strong>
        </div>
        {this.props.players.map((player, key) => (
          <div key={player.id} className="players__single">
            <div className="players__single-data">
              <strong className="player-name">{player.name}</strong>
              <Score score={player.score} />
            </div>
            <div className="players__single-interaction">
              <button
                className="players__single-btn players__single-btn--decrement"
                onClick={() => this.changeScore(player, "decrement")}
              ></button>
              <button
                className="players__single-btn players__single-btn--increment"
                onClick={() => this.changeScore(player, "increment")}
              ></button>
            </div>
          </div>
        ))}
        <form onSubmit={this.onFormSubmit} className="players__new">
          New player:
          <div className="players__new-wrapper">
            <label>
              <input
                type="text"
                name="name"
                value={this.state.newPlayerInput.name}
                onChange={this.setValue}
              />
            </label>
            <button type="submit">Add</button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  players: state.game.players,
  round: state.game.round
});
export default connect(mapStateToProps, {
  addPlayer,
  incrementPlayerScore,
  decrementPlayerScore,
  nextRound
})(Players);
