import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleDeleteState } from "../store/actions/configActions";
import Trash from "../icons/trash";
import "./DeletePanel.scss";

class DeletePanel extends Component {
  render() {
    if (this.props.players.length) {
      return (
        <div
          className={`delete-panel ${
            this.props.deleteState ? "delete-panel--active" : ""
          }`}
          onClick={this.props.toggleDeleteState}
        >
          <Trash color={this.props.deleteState ? "#4b4ba7" : "#ffffff"} />
        </div>
      );
    }
    return "";
  }
}

const mapStateToProps = state => ({
  deleteState: state.config.deleteState,
  players: state.game.players
});

export default connect(mapStateToProps, { toggleDeleteState })(DeletePanel);
