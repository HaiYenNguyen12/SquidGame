
userClickedPattern = [];
gamePattern = [];

buttonColours = ["red", "blue", "yellow","green"];

var started = false;
var level = 0;

$(document).keydown(function(){
while(!started){
  $("#level-title").text("Level" + level);
  nextSequence();
  started = true;
}
});
function nextSequence(){
  userClickedPattern = [];
  level++;
  randomNumber = Math.floor(Math.random()*4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  $("#level-title").text("Level "+level);
}


$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
  link_sound = "sounds/" + name +".mp3";
  var audio = new Audio(link_sound);
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed").delay(100).removeClass("pressed");
}
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
function checkAnswer(currentLevel){
 if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
   if (currentLevel === gamePattern.length-1){
     setTimeout(function () {
     nextSequence();
   }, 500);
   }
 }
   else{
     playSound("wrong");
     $("body").addClass("game-over");
     setTimeout(function () {
     $("body").removeClass("game-over");
   }, 200);
   $("#level-title").text("Game Over, Press Any Key to Restart");
   startOver();
}
}
