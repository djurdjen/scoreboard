import React, { Component } from "react";
import { connect } from "react-redux";
import "./Score.scss";

class Score extends Component {
  iterator(int) {
    const arr = [];
    let key = 0;
    for (let i = 0; i < int; i++) {
      if (arr[key] && arr[key].length >= 5) {
        key++;
      }
      if (!arr[key]) {
        arr.push([]);
      }
      arr[key].push(i);
    }
    return arr;
  }
  render() {
    return (
      <div className="score">
        {this.props.tally ? (
          <div className="score__tally">
            {this.iterator(this.props.score).map((batch, i) => (
              <div key={i} className="score__tally-batch">
                {batch.map(t => (
                  <div key={t} className="tally"></div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="score__normal">{this.props.score}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tally: state.config.tally
});

export default connect(mapStateToProps, {})(Score);
