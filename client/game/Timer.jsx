import React from "react";

import {StageTimeWrapper} from "meteor/empirica:core";
import Timer from "./Timer.jsx";

class timer extends React.Component {
  render() {
    const { remainingSeconds } = this.props;
    const minutes = (remainingSeconds > 1000000) ? ("0" + Math.floor((remainingSeconds - 1000000) / 60)).slice(-2) : "00";
    const seconds = (remainingSeconds > 1000000) ? ("0" + ((remainingSeconds - 1000000) - minutes * 60)).slice(-2) : "00";
  
  
    const classes = ["timer"];
    if (remainingSeconds - 1000000 <= 5) {
      classes.push("lessThan5");
    } else if (remainingSeconds - 1000000 <= 10) {
      classes.push("lessThan10");
    }

    return (
      <div className={classes.join(" ")}>
        <h5 className='bp3-heading'>Timer</h5>
        <span className="seconds">{minutes}:{seconds}</span>
      </div>
    );
  }
}

export default (Timer = StageTimeWrapper(timer));
