import React from "react";
import Author from "./Author";
import { TimeSync } from "meteor/mizzao:timesync";
import moment, { min } from "moment";
import { Mongo } from "meteor/mongo";

const pretext = "Hi! Would you mind sharing some of the websites you found?";
const chatlog = new Mongo.Collection("chat-log");

var Filter = require('bad-words'),
    filter = new Filter();

export default class ChatLog extends React.Component {
  state = { comment: pretext, time: 0 };

  componentDidMount() {
    // we use the "data-adaptheight" attribute as a marker
    var textAreas = [].slice.call(document.querySelectorAll('textarea[data-adaptheight]'));
    var vm = this;
    // iterate through all the textareas on the page
    textAreas.forEach(function(el) {

        // we need box-sizing: border-box, if the textarea has padding
        el.style.boxSizing = el.style.mozBoxSizing = 'border-box';

        // we don't need any scrollbars, do we? :)
        el.style.overflowY = 'hidden';

        // the minimum height initiated through the "rows" attribute
        var minHeight = el.scrollHeight;

        el.addEventListener('input', function() {
            vm.adjustHeight(el, minHeight);
        });
        

        // we adjust height to the initial content
        vm.adjustHeight(el, minHeight);

    });
  }

  adjustHeight = (el, minHeight) => {
    // compute the height difference which is caused by border and outline
    var outerHeight = parseInt(window.getComputedStyle(el).height, 10);
    var diff = outerHeight - el.clientHeight;

    // set the height to 0 in case of it has to be shrinked
    el.style.height = 0;

    // set the correct height
    // el.scrollHeight is the full height of the content, not just the visible part
    let height = Math.max(minHeight, el.scrollHeight + diff) + 'px';
    el.style.height = Math.max(minHeight, el.scrollHeight + diff) + 'px';    
  }

  handleChange = (e) => {
    if (e.nativeEvent.inputType === "insertLineBreak") {
      this.handleData();
    } else {
      const el = e.currentTarget;
      console.log('el', el.value)
      this.setState({ [el.name]: el.value });
    }
  };

  handleData = () => {
    const text = filter.clean(this.state.comment.trim());     
    if (text !== "") {
      const { stage, player, messages } = this.props;
     
     
      stage.append("chat", {
        text,
        playerId: player._id,
        at: moment(TimeSync.serverTime(null, 1000))
      });      

      var txt = document.querySelector('textarea[data-adaptheight]');
      txt.style.height = "56px";

      this.setState({ comment: pretext });
      
      if (text === pretext) {
        this.setState({ comment: "" });
      }

      for (let i = 0; i < messages.length; i++) {
        if (messages[i].text === pretext) {          
          this.setState({ comment: "" });
          break;
        }
      }

      this.setState({ time: 0 });

      chatlog.insert({chat: text, playerid: player.id, player_id: player._id});
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.handleData();
  };

  render() {
    const { comment } = this.state;
    const { messages, player } = this.props;

    console.log('message', messages);
    console.log('comment', comment)
    return (
      <div className="chat bp3-card">
        <Messages messages={messages} player={player} />
        <form onSubmit={this.handleSubmit}>
          <div className="bp3-control-group">
            <textarea
              name="comment"  
              className="bp3-input" 
              value={comment}
              onChange={this.handleChange}              
              rows="1"
              data-adaptheight              
            ></textarea>
            <button type="submit" className="bp3-button bp3-intent-primary">
              Send
            </button>
          </div>
        </form>
      </div>
      
    );
  }
}

const chatSound = new Audio("experiment/unsure.mp3");
class Messages extends React.Component {
  componentDidMount() {
    this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length < this.props.messages.length) {
      this.messagesEl.scrollTop = this.messagesEl.scrollHeight;
      chatSound.play();
    }
  }
  render() {
    const { messages, player } = this.props;

    return (
      <div className="messages" ref={(el) => (this.messagesEl = el)}>
        {messages.length === 0 ? (
          <div className="empty">No messages yet...</div>
        ) : null}
        {messages.map((message, i) => (
          <Message
            key={i}
            message={message}
            self={message.subject ? player._id === message.subject._id : null}
          />
        ))}
      </div>
    );
  }
}

class Message extends React.Component {

  validURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  render() {
    const { text, subject } = this.props.message;
    const { self } = this.props;
    
    const txtArr = text.split("/n");   
    
    return (
      <div className="message">
        <Author player={subject} self={self} />
        <div className="chat-text">
          {txtArr.length > 0 && txtArr.map((txt, i) => (
            <div key={i}>
              {this.validURL(txt) === true ? (
                <a className="d-block" href={txt} target="blank">{txt}</a>
              ) : txt}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
