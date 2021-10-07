import React from "react";

import {Centered} from "meteor/empirica:core";

export default class Thanks extends React.Component {
  static stepName = "Thanks";  
  render() {
    const { player, game } = this.props;
    const receipes = localStorage.getItem("receipe") ? JSON.parse(localStorage.getItem("receipe")) : [];
    
    return (
      <Centered>
        <div className="game finished">
          <div className="pt-non-ideal-state">
            <div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
              <span className="pt-icon pt-icon-thumbs-up" />
            </div>
            <h4 className="pt-non-ideal-state-title">Finished! Please return to the survey and paste the submission code. </h4>
            <hr />
            <h4 className="pt-non-ideal-state-title">
              Submission code: tSwUf976Eh2kPKYu
            </h4>
            <hr />
            <div className="pt-non-ideal-state-description">
              Thank you for participating!  
            </div>
            {receipes.length > 0 && (
              <div>
                <h4 className="pt-non-ideal-state-title">
                  Receipes found
                </h4>
                 <hr />
                {receipes.map((receipe, i) => 
                  Object.values(receipe).map((val, index) => (
                    <a className="d-block" href={ val.indexOf('https') > -1 ? val : 'https://'+val } target="blank" key={index}>{val}</a>
                  ))                  
                )}
              </div>
            )}           
           
          </div>
        </div>
      </Centered>
    );
  }
}
