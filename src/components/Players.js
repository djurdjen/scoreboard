import React, { Component } from "react";
import { connect } from "react-redux";
import Player from "./Player.js";
import {
  addPlayer,
  incrementPlayerScore,
  decrementPlayerScore,
  nextRound,
  changePlayerName,
  deletePlayer
} from "../store/actions/gameActions";
import "./Players.scss";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPlayerInput: {
        name: ""
      },
      roundAnimation: false,
      roundHistory: this.props.history[this.props.history.length - 1] || {},
      editing: "",
      editingValue: ""
    };
    this.setValue = this.setValue.bind(this);
    this.changeScore = this.changeScore.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.startNewRound = this.startNewRound.bind(this);
    this.disableNextRound = this.disableNextRound.bind(this);
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

  componentWillReceiveProps(props) {
    if (
      props.players.length &&
      props.players.length !== this.props.players.length
    ) {
      const newHistory = {};
      props.players.forEach(p => {
        newHistory[p.id] = p.score;
      });
      this.setState({ roundHistory: newHistory });
    }
    // check if game was reset, if so, reset the round history
    if (this.props.gameId !== props.gameId) {
      this.setState({ roundHistory: {} });
    }
    if (props.round === this.props.round + 1) {
      this.setState({ roundAnimation: true });
      setTimeout(() => {
        this.setState({ roundAnimation: false });
      }, 400);
    }
  }

  changeScore(id, type = "increment") {
    const player = this.props.players.find(p => p.id === id);
    // change score in store
    this.props[
      type === "increment" ? "incrementPlayerScore" : "decrementPlayerScore"
    ](player.id);

    // change score in history settings, create a clean copy with JSON.parse and JSON stringify
    const copy = JSON.parse(JSON.stringify(this.state.roundHistory));
    type === "increment" ? copy[player.id]++ : copy[player.id]--;
    this.setState({
      roundHistory: copy
    });
  }

  startNewRound() {
    this.props.nextRound(this.state.roundHistory);
  }

  disableNextRound() {
    return (
      JSON.stringify(this.props.history[this.props.history.length - 1]) ===
        JSON.stringify(this.state.roundHistory) ||
      !Object.values(this.state.roundHistory).find(score => score)
    );
  }

  render() {
    return (
      <div className="players">
        {this.props.players.length ? (
          <div className="players__round">
            <button
              disabled={this.disableNextRound()}
              onClick={this.startNewRound}
            >
              New round
            </button>
            <strong
              className={`players__round-text ${
                this.state.roundAnimation ? "animate" : ""
              }`}
            >
              Round <span className="round-number">{this.props.round}</span>
            </strong>
          </div>
        ) : (
          ""
        )}
        {this.props.players.map((player, key) => (
          <Player
            key={player.id}
            data={player}
            changeScore={this.changeScore}
            changeName={this.props.changePlayerName}
            removePlayer={this.props.deletePlayer}
            deleteState={this.props.deleteState}
          />
        ))}
        <form action="#" onSubmit={this.onFormSubmit} className="players__new">
          Add new player:
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
  round: state.game.round,
  gameId: state.game.id,
  history: state.game.history,
  deleteState: state.config.deleteState
});
export default connect(mapStateToProps, {
  addPlayer,
  incrementPlayerScore,
  decrementPlayerScore,
  nextRound,
  changePlayerName,
  deletePlayer
})(Players);
