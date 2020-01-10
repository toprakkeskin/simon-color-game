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
  if (userPlayedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length - 1 == currentLevel) {
      setTimeout(nextSequence, 1000);
    }
  } else {
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

    resetGame();
  }
}

$('.btn').click(function(e) {
  //if (!isGameStarted) {
  //  startGame();
  //  return;
  //}
  userChosenColor = $(this).attr('id');
  userPlayedPattern.push(userChosenColor);
  playAnimation(userChosenColor);
  playSound(userChosenColor);

  checkAnswer(userPlayedPattern.length - 1);
});

$(document).keydown(function() {
  startGame();
});
