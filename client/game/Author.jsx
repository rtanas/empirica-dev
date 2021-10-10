import React from "react";

export default class Author extends React.Component {
  renderStatus(type) {
    const { player } = this.props;
    let statusValue = "";
    if (player.online == true) {
      if(player.idle == false) {
        statusValue = "online";
      } else {
        statusValue = "idle";
      }
    }else {
      statusValue = "offline";
    }
    
    return (
      <div className="wrapper-status-value">
        { type === 'color'? (
          <div className={`status-color ${statusValue}`}></div>
        ) : (
          <span className={`status-value ${statusValue}`}>{statusValue}</span>
        )}
      </div>
    );
  }
  
  render() {
    const { player, self } = this.props;

    return (
      <div className="author">
        <div className="wrapper-avatar">
          <span className="image">
            <img src={player.get("avatar")} />
            {this.renderStatus('color')}
          </span>
          {this.renderStatus('value')}
        </div>
        <span className="name" style={{ color: player.get("nameColor") }}>
          {self ? "You" : player.get("name")}
        </span>
      </div>
    );
  }
}
