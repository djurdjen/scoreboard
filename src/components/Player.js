import React, { Component, createRef } from "react";
import Score from "./Score.js";
import Edit from "../icons/edit.js";
import Trash from "../icons/trash.js";
import "./Player.scss";

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingValue: this.props.data.name,
      editing: ""
    };
    this.setEditing = this.setEditing.bind(this);
    this.setEditingValue = this.setEditingValue.bind(this);
    this.changeName = this.changeName.bind(this);
    this.removePlayer = this.removePlayer.bind(this);
    this.inputRef = createRef();
  }

  setEditing(id) {
    this.setState({ editing: id, editingValue: this.props.data.name });
    setTimeout(() => {
      this.inputRef.current.querySelector("input").focus();
    }, 500);
  }
  setEditingValue(e) {
    this.setState({ editingValue: e.target.value });
  }
  changeName(e = null) {
    if (e) {
      e.preventDefault();
    }
    this.props.changeName({
      name: this.state.editingValue,
      id: this.props.data.id
    });
    this.setState({ editing: "" });
  }

  removePlayer(id) {
    const answer = window.confirm(
      "Are you sure you want to delete this player?"
    );
    if (answer) {
      this.props.removePlayer(id);
    } else {
      return;
    }
  }

  render() {
    const { id, name, score } = this.props.data;
    return (
      <div key={id} className="player">
        <div className="player__data">
          {this.state.editing === id ? (
            <form
              className="player__edit"
              action="#"
              ref={this.inputRef}
              onSubmit={this.changeName}
            >
              <input
                className="player__edit-input"
                name={id}
                onChange={this.setEditingValue}
                value={this.state.editingValue}
                onBlur={this.changeName}
              />
            </form>
          ) : (
            <div>
              <strong className="player__name">{name}</strong>

              <span
                className="player__edit"
                onClick={() => this.setEditing(id)}
              >
                <Edit className="player__edit-icon" />
              </span>
            </div>
          )}
          <Score score={score} />
        </div>
        {this.props.deleteState ? (
          <div className="player__delete" onClick={() => this.removePlayer(id)}>
            <Trash />
          </div>
        ) : (
          <div className="player__interaction">
            <div
              className="player__btn player__btn--decrement"
              onClick={() => this.props.changeScore(id, "decrement")}
            ></div>
            <div
              className="player__btn player__btn--increment"
              onClick={() => this.props.changeScore(id, "increment")}
            ></div>
          </div>
        )}
      </div>
    );
  }
}

export default Player;
