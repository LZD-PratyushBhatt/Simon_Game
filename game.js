var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0; //Starting level
var started = false; //Game started, first run

$(".btn").click(function() {
  //  var userChosenColour = this.id; alternate::
  //console.log(this);  returns complete block of tag used. with its content
  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour); //play sound on click

  //animating on click
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});
//Detecting for keyboard press

$(document).keypress(function() {
  if (!started) {
    // playSound("JaiHind");
    $("#level-title").html("Level " + level);
    nextSequence();
    started = true;
  }

})

function nextSequence() {
  userClickedPattern = [];
  level++; //incrementing the level;
  $("#level-title").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(50).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour); //play sound randomly

}

//Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//Animate Button on userClickedPattern
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Checking answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success!");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 300);
    }
    //If lengths are not equal then you do nothing, as you are waiting for the next click by the user.

  } else {
    playSound("wrong");
    wrongAnswerflash();
    console.log("wrong!");
    $("h1").html("Game Over!, Press any key to restart!");
    startOver();
  }

}
//Flashing on wrong Answer
function wrongAnswerflash()
{
  $("body").addClass("game-over");
  setTimeout(function()
{
  $("body").removeClass("game-over");
},200);
}

//Called when wrong answer to restart the game
function startOver()
{
  level=0;
  gamePattern=[];
  //No need to set userClickedPattern=[] as it is done on nextSequence!
  started=false;
}
