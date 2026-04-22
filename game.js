var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// START GAME
$(document).keydown(function() {

    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

// NEXT SEQUENCE
function nextSequence() {

    userClickedPattern = []; // reset user input

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100);

    playSound(randomChosenColour);
}

// BUTTON CLICK
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

});

// CHECK ANSWER
function checkAnswer(currentLevel) {

    // check correct click
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        // check full sequence completed
        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

// RESET GAME
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}

// SOUND
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// ANIMATION 
function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}