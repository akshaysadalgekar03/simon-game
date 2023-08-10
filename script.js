let titleChange = document.querySelector('#title');
let levelChange = document.querySelector("#level-display");
let simonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;

//User selection
$('.colors').click(function() {
    if (gamePattern.length >= 1) {
        let userSelection = $(this).attr("class").split(" ")[0];
        sound(userSelection);
        userPattern.push(userSelection);
        console.log("userPattern", userPattern)
        pressAnimation(userSelection);
        result(userPattern.length - 1);
    }
});
//Computer selection
function nextMove() {
    userPattern = []
    level += 1;
    levelChange.innerHTML = level;
    let randomNumber = Math.floor(Math.random() * 4);
    let randomColor = simonColors[randomNumber];
    gamePattern.push(randomColor);
    console.log("game-pattern!!!!", gamePattern)
    $("." + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
    sound(randomColor);

}

function sound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play()
}

function pressAnimation(color) {
    $("." + color).addClass("pressed");
    setTimeout(() => {
        $("." + color).removeClass("pressed");
    }, 100);
}
let toggle = false;
$(document).keypress(function() {
    if (!toggle) {
        nextMove();
        toggle = true;
    }
});


function result(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextMove();
            }, 1000);
        }
    } else {
        sound("wrong");
        startOver();
        titleChange.innerText = "Game Over, Press Any Keyboard Key to Restart";
        levelChange.innerHTML = 0;
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    toggle = false;
}