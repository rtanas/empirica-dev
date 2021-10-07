import Empirica from "meteor/empirica:core";

const botIntro =
  "Hi! I'm Jack. I also had to do a similar task before. Here are the recipes I found:";
const botURLs = [
  "https://www.cbc.ca/life/food/roasted-eggplant-with-baked-eggs-1.5005275",
  "https://www.dietdoctor.com/recipes/low-carb-eggplant-hash-eggs",
  "https://lidiasitaly.com/recipes/baked-eggplant-eggs/",
  "https://www.allrecipes.com/recipes/1084/fruits-and-vegetables/vegetables/eggplant/",
  "https://www.themediterraneandish.com/braised-eggplant-recipe-greek-style/",
  "https://www.crunchycreamysweet.com/baked-eggplant/",
  "https://www.bonappetit.com/recipes/slideshow/eggplant-recipes",
  "https://immigrantstable.com/eggplant-shakshuka/",
  "https://www.academiabarilla.it/en/ricetta/eggplants-with-tomatoes-and-eggs/",
  "https://lidiasitaly.com/recipes/baked-eggplant-eggs/"
];

// This is where you add bots, like Bob:
Empirica.bot("bob", {
  //   // Called during each stage at tick interval (~1s at the moment)

  onStageTick(bot, game, round, stage, secondsRemaining) {
    if (stage.get("chat") && stage.get("chat").length == 1) {
      const chat = stage.get("chat") ?? [];

      let content = "";
      for (let i = 0; i < botURLs.length; i++) {
        content += (i+1) + "/n" + botURLs[i] + "/n";
      }

      Meteor.setTimeout(() => {
        chat.push({
          text: botIntro,
          playerId: bot._id
        });
        stage.set("chat", chat);

        message_stop = false
        let chatPush = Meteor.setInterval(() => {
          if (message_stop === true) {
            Meteor.clearInterval(chatPush);
          } else {
            chat.push({
              text: content,
              playerId: bot._id
            });

            stage.set("chat", chat);
            message_stop = true;
          }
        }, 7000); // URLs interval
      }, 4000); //Intro interval
    }
  }
});
