let seqOutput = [];
let seqPlayer = [];
let colors = ["green", "red", "yellow", "blue"];

let level = 0;
let started = false;
let buttons = $(".btn");

$(document).keydown(function() {
  if (!started) {
    $('#level-title').text(`Level ${level}`);
    sequence(colors);
    started = true;
  }
});


// clicks and key
buttons.click(function() {
  let btnClass = $(this).attr("id");

  seqPlayer.push(btnClass);
  btnColor(btnClass);
  buttonAnimation(btnClass);

  console.log(`seqPlayer = ${seqPlayer}`);
  console.log(" ");
  simonGame(seqPlayer.length-1);
});




// sequence and game
function sequence(colors) {
  level++;
  $('#level-title').text(`Level ${level}`);

  let seq = Math.floor(Math.random() * buttons.length);
  let seqFinal = colors[seq];

  btnColor(seqFinal);
  buttonAnimation(buttons[seq]);
  seqOutput.push(seqFinal);

  console.log(`seqOutput = ${seqOutput}\n`);
}

function simonGame(currentIndex) {
  if (seqOutput[currentIndex] === seqPlayer[currentIndex]) {
    if (seqPlayer.length === seqOutput.length) {
      setTimeout(function () {
        seqPlayer = [];
        sequence(colors);
      }, 1000);
    }
    console.log(`player[${currentIndex}] = ${seqPlayer}`);
    console.log(`pc[${currentIndex}] = ${seqOutput}`);
  } else {
    play('sounds/wrong.mp3');
    $("body").addClass("game-over");
    ('#level-title').text(`Game Over, Press Any Key to Restart`);

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 100);

    restart();
  }
  console.log("correct!");
  console.log(" ");
}




// important functions
function btnColor(item) {
  if (item === 'green') {
    play('sounds/green.mp3');
  } else if (item === 'red') {
    play('sounds/red.mp3');
  } else if (item === 'yellow') {
    play('sounds/yellow.mp3');
  } else if (item === 'blue') {
    play('sounds/blue.mp3');
  }
}

function restart() {
  level = 0;
  seqOutput = [];
  seqPlayer = [];
  started = false;
}





// utils
function play(url) {
  new Audio(url).play();
}

function buttonAnimation(item) {
  $(item).addClass("pressed");

  setTimeout(function() {
    $(item).removeClass("pressed");
  }, 100);
}