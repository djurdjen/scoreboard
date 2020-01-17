import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleHistory } from "../store/actions/configActions";

// load the images fro pwa cache
import History from "../icons/history";

import "./HistoryPanel.scss";

class ConfigPanel extends Component {
  constructor() {
    super();
    this.mapHistory = this.mapHistory.bind(this);
  }
  mapHistory() {
    return Object.values(this.props.history).map((entry, i) => {
      return Object.entries(entry).map(([key, val]) => {
        const difference = (() => {
          const previous = this.props.history[i - 1]
            ? this.props.history[i - 1][key]
            : "";
          return !isNaN(previous) ? val - previous : val;
        })();

        return { name: key, score: val, difference };
      });
    });
  }
  scoreTypeClass(score) {
    switch (true) {
      case score < 0:
        return "negative";
      case score > 0:
        return "positive";
      default:
        return "neutral";
    }
  }
  render() {
    return (
      <div className="history-panel">
        <button
          className={`history-panel__toggle ${
            this.props.historyToggled ? "history-panel__toggle--active" : ""
          }`}
          onClick={this.props.toggleHistory}
        >
          <History color={this.props.historyToggled ? "#9595cf" : "#ffffff"} />
        </button>
        <div
          className={`history-panel__wrapper ${
            this.props.historyToggled ? "history-panel__wrapper--active" : ""
          }`}
        >
          <div className="history-panel__container">
            {this.mapHistory().map((entry, key) => (
              <div className="history-panel__entry" key={key}>
                <span className="history-panel__entry-round">
                  Round {key + 1}
                </span>
                <div className="history-panel__entry-data">
                  {entry.map(player => (
                    <div
                      className="history-panel__entry-player"
                      key={player.name}
                    >
                      <strong>{player.name}: </strong>
                      <span>{player.score}</span>
                      <span
                        className={`score-difference ${this.scoreTypeClass(
                          player.difference
                        )}`}
                      >
                        ({player.difference > 0 ? "+" : ""}
                        {player.difference})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  historyToggled: state.config.historyToggled,
  history: state.game.history
});
export default connect(mapStateToProps, { toggleHistory })(ConfigPanel);
