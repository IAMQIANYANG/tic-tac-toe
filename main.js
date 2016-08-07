/**
 * Created by pandachain on 2016-08-06.
 */

// this file uses scripts from gameplay.js
var currentPlayerMark = '';
var currentGameBoard = [
  document.querySelector('#topLeft'),
  document.querySelector('#topMiddle'),
  document.querySelector('#topRight'),
  document.querySelector('#left'),
  document.querySelector('#middle'),
  document.querySelector('#right'),
  document.querySelector('#bottomLeft'),
  document.querySelector('#bottomMiddle'),
  document.querySelector('#bottomRight')
];

var gameInfoArea = document.querySelector('#gameControl');

var startGame = function(){
  if (document.querySelector('#X').checked === true) {
    currentPlayerMark = document.querySelector('#X').value;
    gameInfoArea.innerHTML = '<p>You start!';
  } else if(document.querySelector('#O').checked === true) {
    currentPlayerMark = document.querySelector('#O').value;
    gameInfoArea.innerHTML = '<p>Computer start!';
  }
  var newGame = Gameplay();
  newGame.chooseAndAssignMark(currentPlayerMark);
  play(newGame);
};


var play = function(gameplay){
  if (gameplay.playerMark === 'O'){
    var firstMove = gameplay.getComputerMove();
    currentGameBoard[firstMove].textContent = gameplay.computerMark;
    gameplay.setComputerMove(firstMove);
  }
  currentGameBoard.forEach(function (boardPosition) {
    boardPosition.addEventListener('click', function () {
      this.textContent = gameplay.playerMark;
      var playerMove = currentGameBoard.indexOf(this);
      gameplay.setPlayerMove(playerMove);
      if (gameplay.isWining(gameplay.board)) {
        gameInfoArea.innerHTML = '<p>You won!';
        startAgain(gameplay);
      } else if (gameplay.isBoardFull()) {
        gameInfoArea.innerHTML = "<p>It's a tie!";
        startAgain(gameplay);
      } else {
        var computerMove = gameplay.getComputerMove();
        currentGameBoard[computerMove].textContent = gameplay.computerMark;
        gameplay.setComputerMove(computerMove);
        if (gameplay.isWining(gameplay.board)) {
          gameInfoArea.innerHTML = 'You lost!';
          startAgain(gameplay);
        } else if(gameplay.isBoardFull()) {
          gameInfoArea.innerHTML = "<p>It's a tie!";
          startAgain(gameplay);
        }
      }
    })
  })
};

var startAgain = function(gameplay){
  clearBoard();
  gameplay.reset();
};


var clearBoard = function(){
  currentGameBoard.forEach(function(boardPosition){
    boardPosition.textContent = '';
  })
};

var startButton = document.querySelector('#start');
startButton.onclick = startGame;

