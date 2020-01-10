var buttonColors = ['red', 'blue', 'green', 'yellow'];
var randomChosenColor;
var userChosenColor;
var gamePattern = [];
var userPlayedPattern = [];
var isGameStarted = false;
var level = 0;

function playSound(color) {
  var sound = new Audio('sounds/' + color + '.mp3');
  sound.play();
}

function playAnimation(color) {
  // Get button
  var btn = $('#' + color);

  // Blink animation
  btn.fadeOut(100).fadeIn(100);
}

function nextSequence() {
  // Reset played pattern
  userPlayedPattern = [];

  // Choose a color randomly
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];

  // Add to the game pattern
  gamePattern.push(randomChosenColor);

  // Blink animation
  playAnimation(randomChosenColor);

  // Play sound
  playSound(randomChosenColor);

  // Increase the level and update the title
  level++;
  $('#level-title').text('Level ' + level);
}

function startGame() {
  if (!isGameStarted) {
    isGameStarted = true;
    $('#warning').hide();
    nextSequence();
  }
}

function resetGame() {
  level = 0;
  gamePattern = [];
  isGameStarted = false;
  $('#warning').show();
}

function checkAnswer(currentLevel) {
  // If current move is valid
  if (userPlayedPattern[currentLevel] === gamePattern[currentLevel]) {
    // If all pattern is played correctly, continue to next level
    if (gamePattern.length - 1 == currentLevel) {
      setTimeout(nextSequence, 1000);
    }
  } else { // If current move is not valid
    // Background color animation
    $('body').addClass('game-over');

    setTimeout(function() {
      $('body').removeClass('game-over');
    }, 200);

    // Play gameover sound
    var wrongSound = new Audio('sounds/wrong.mp3');
    wrongSound.play();

    // Change title
    $('#level-title').text('Game Over, Press Any Key to Restart');

    // Reset the game state
    resetGame();
  }
}

$('.btn').click(function(e) {
  // Start game if it's not started yet
  if (!isGameStarted) {
    startGame();
    return;
  }

  // Add new chosen color by user to the array
  userChosenColor = $(this).attr('id');
  userPlayedPattern.push(userChosenColor);

  // Play animation and sound
  playAnimation(userChosenColor);
  playSound(userChosenColor);

  // Check move
  checkAnswer(userPlayedPattern.length - 1);
});

// Handle starting game with key press
$(document).keydown(function() {
  startGame();
});
