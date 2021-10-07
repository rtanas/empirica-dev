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
  "https://lidiasitaly.com/recipes/baked-eggplant-eggs/",
  "Hope it helps! Enjoy the recipes. All the best, Jack"
];

// This is where you add bots, like Bob:
Empirica.bot("bob", {
  //   // Called during each stage at tick interval (~1s at the moment)

  onStageTick(bot, game, round, stage, secondsRemaining) {
  }
});