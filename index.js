var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

// Start game, set level to "Level 1" and call nextSequence()
$(document).one("keypress", function (e) {
  var code = e.code;
  if (code === "KeyA") {
    nextSequence();
    $("#level-title").text("Level " + level);
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  console.log(userClickedPattern);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  console.log(randomNumber);
  var randomChosenColor = buttonColors[randomNumber];
  console.log(randomChosenColor);
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);

  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    startOver();
  }
}

function startOver() {
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  $("html").on("keypress", function () {
    userClickedPattern = [];
    gamePattern = [];
    level = "";
    setTimeout(function () {
      nextSequence();
    }, 500);
  });
}
