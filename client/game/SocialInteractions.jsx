import React from "react";
import EventLog from "./EventLog";
import ChatLog from "./ChatLog";
import Timer from "./Timer.jsx";

export default class SocialInteractions extends React.Component {
  renderPlayer(player, self = false) {
    return (
      <div className="player" key={player._id}>
        <span className="image">
          
          <img src={player.get("avatar")} />
        </span>
        {/* <span className="name" style={{ color: player.get("nameColor") }}> */}
        <span className="name" style={{ color: player.get("nameColor") }}>          
          {self ? "You" : player.get("name")}
        </span>
      </div>
    );
  }

  render() {
    const { game, stage, player } = this.props;

    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    console.log("otherPlayers", otherPlayers);
    console.log("chat", stage.get("chat"));
    console.log("log", stage.get("log"));
    const messages = stage.get("chat").map(({ text, playerId }) => ({
      text,
      subject: game.players.find(p => p._id === playerId)
    }));
    const events = stage.get("log").map(({ subjectId, ...rest }) => ({
      subject: subjectId && game.players.find(p => p._id === subjectId),
      ...rest
    }));

    return (
      <div className="social-interactions">
        <div className="status">
          <div className="players bp3-card">
            {this.renderPlayer(player, true)}
            {otherPlayers.map(p => this.renderPlayer(p))}
          </div>

          <div className="total-score bp3-card">
            <Timer stage={stage} />
          </div>
        </div>
        
        <ChatLog messages={messages} stage={stage} player={player} />
      </div>
    );
  }
}
