import React from "react";
import { Mongo } from "meteor/mongo";
import {StageTimeWrapper} from "meteor/empirica:core";
import Form from "./Form.jsx";

const urlrecipes = new Mongo.Collection("url-receipes");

import { Centered } from "meteor/empirica:core";
import Urlrecipe from "./Urlrecipe";

const formCount = 10;
let formArr = [];
let receipArr = [];

for (let j = 0; j < formCount; j++) {
  formArr.push(j);
}


class form extends React.Component {
  

  componentDidMount() {
    localStorage.setItem("receipe", "");
  }

  finishTask = () => {
    receipArr = [];
    
    const formDiv = document.getElementsByClassName("formdiv");
    for (let i = 0; i < formDiv.length; i++) {
      const key = formDiv.item(i).querySelector("label").innerHTML;
      const val = formDiv.item(i).querySelector("input").value;
      if (val == "") {
        alert ("The input must be filled.");
        formDiv.item(i).querySelector("input").focus();
        return;
      }
      if (this.validURL(val) !== true) {
        alert ("The input provided is not a valid URL.");
        formDiv.item(i).querySelector("input").focus();
        return;
      } 
        
      receipArr.push({[key.replace(/ /g, "")]: val});
      
    }

    localStorage.setItem("receipe", JSON.stringify(receipArr));
    
    const { player } = this.props;  
    for (let j = 0; j < receipArr.length; j++) {  
      let receipKey = "", receipValue = ""; 
      for(var key in receipArr[j]){
        receipKey = key;
        receipValue = receipArr[j][key];
      }      
      urlrecipes.insert({[receipKey]: receipValue, playerid: player.id, player_id: player._id});  
    }  
    setTimeout(() => {
      player.set("satisfied", true);
      player.exit("finished");
    }, 300);    
  }

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
    const { remainingSeconds, player } = this.props;
    let content = <Centered>
          <div className="task1">          
          <p>
            <strong>
            Instructions
            </strong>   
            <li> 
            Search online for 10 different recipes that contain all of the following ingredients: <strong>eggplants, eggs, cheese. </strong> 
            </li>
            <li> Provide the URLs to the recipe description in the text boxes below </li>
            <li> You have maximum 30 minutes to finish the task. If you finish earlier, click "Finish task" </li>
            <li>
            The <strong>chat</strong> allows you to chat with another Prolific user who has just completed the same task. 
            You can ask him/her to help you out.
            </li>
            <br /> 
            <strong>Don't forget the requirements </strong> <br /> 
            (we will check all before making the payment for the HIT) 
            <li> All recipes are different.</li>
            <li> Each recipe is from a different website. </li>
            <li> All recipes contain the required ingredients. 
              An algorithm will automatically scan the pages provided, so the 3 ingreedients need to be clearly stated (in either singular or plural) on the webpage with the recipe description. </li>

            <br /> 
            <strong> Your conversation partner has some symbols on the avatar. <br />
              What do they mean? </strong> <br/> 
            <li> Rating: How useful his/her help was to the other participants </li>
            <li> Time: The average time to reply to a request in the chat. </li>
          </p>
            {formArr.map((count, i) =>        
              <div key={i}>
                <Urlrecipe count={i} />
              </div>
            )}
            <div className="finishbtn">
              <button
                type="button"
                className="bp3-button bp3-intent-primary bp3-large"
                onClick={this.finishTask}            
              >
                Finish task
              </button>
            </div>
          </div>
          
        </Centered>    

    if (remainingSeconds - 1000000 === -2) {      

      let receipeArr = [];
    
      const formDiv = document.getElementsByClassName("formdiv");
      for (let i = 0; i < formDiv.length; i++) {
        const key = formDiv.item(i).querySelector("label").innerHTML;
        const val = formDiv.item(i).querySelector("input").value;
        if (val == "") { 
          alert("The time has run out. Please input all recipe URLs and click Finish Task.");         
          formDiv.item(i).querySelector("input").focus();
          return (
            <div>
              {content}
            </div>
          );
        }
        if (this.validURL(val) !== true) {     
          alert("The time is out and not all provided recipe URLs are valid. Please provide a valid input and then click Finish Task");     
          formDiv.item(i).querySelector("input").focus();
          return (
            <div>
              {content}
            </div>
          );
        } 
          
        receipeArr.push({[key.replace(/ /g, "")]: val});
        
      }

      localStorage.setItem("receipe", JSON.stringify(receipeArr));      
      
      for (let j = 0; j < receipeArr.length; j++) {  
        let receipeKey = "", receipeValue = ""; 
        for(var key in receipeArr[j]){
          receipeKey = key;
          receipeValue = receipeArr[j][key];
        }      
        urlrecipes.insert({[receipeKey]: receipeValue, playerid: player.id, player_id: player._id});  
      }  
      setTimeout(() => {
        player.set("satisfied", true);
        player.exit("finished");
      }, 300);    
    }    

    return (
      <div>
        {content}
      </div>      
    );
  }  
}

export default (Form = StageTimeWrapper(form));