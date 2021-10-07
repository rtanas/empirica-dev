import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import BrowserDetection from "react-browser-detection";

export default class Consent extends React.Component {
  static renderConsent() {
    console.log("this is not firefox");
    return (
      <Centered>
        <div className="consent bp3-ui-text">
          <h1 className="bp3-heading">Welcome to the Collect Recipes Application!</h1>
          <p>
          Here is where you will run the main task of this HIT. 
          </p>
          <p>
          <strong>
          For this task, you will be randomly paired with another Prolific user who has completed the task before. <br />
          If you need help with the task, you can reach out to him/her via the chat.
          </strong>    
          </p>
          
          <p>
          <strong>Important information:</strong> 
          <li>The task <strong>must be done on a desktop or laptop</strong>. There is NO mobile support. </li>
          <li>The only supported browsers are <strong>Google Chrome and Safari</strong>. Make sure you are using one of these. </li>
          <li>For the best experience, please maximize the window containing this task or make it as large as possible.</li>
          </p>

          <p> 
          Start the task by clicking the button "Start Task" below.
          </p>
          <ConsentButton text="Start Task" />
        </div>
      </Centered>
    );
  }

  renderNoFirefox = () => {
    console.log("this is fire fox");
    return (
      <div className="consent">
        <h1 className="bp3-heading" style={{ textAlign: "center", color: "red" }}>
          DO NOT USE FIREFOX!!
        </h1>
        <p style={{ textAlign: "center" }}>
          Please, don't use firefox! It breaks our game and ruins the experience
          for your potential teammates!
        </p>
      </div>
    );
  };

  render() {
    const browserHandler = {
      default: browser =>
        browser === "firefox" ? this.renderNoFirefox() : Consent.renderConsent()
    };

    return (
      <Centered>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </Centered>
    );
  }
}
