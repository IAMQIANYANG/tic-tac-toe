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
  var computerCanPlay = false;
  var playerCanPlay = true;
  if (gameplay.playerMark === 'O'){
    var firstMove = gameplay.getAndSetComputerMove();
    currentGameBoard[firstMove].textContent = gameplay.computerMark;
  }
  
  currentGameBoard.forEach(function (boardPosition, positionIndex) {
    boardPosition.addEventListener('click', function () {
      if(gameplay.isSpaceFree(gameplay.board, positionIndex) && playerCanPlay){
        boardPosition.textContent = gameplay.playerMark;
        var playerMove = currentGameBoard.indexOf(this);
        gameplay.setPlayerMove(playerMove);
        computerCanPlay = true;
        playerCanPlay = false;
      }
      if (gameplay.isWining(gameplay.board)) {
        gameInfoArea.innerHTML = '<p>You won!';
        // startAgain(gameplay);
        // updateResult('player');
      } else if (gameplay.isBoardFull()) {
        gameInfoArea.innerHTML = "<p>It's a tie!";
        startAgain(gameplay);
        updateResult('tie');

      } else {
        if (computerCanPlay) {
          var computerMove = gameplay.getAndSetComputerMove();
          currentGameBoard[computerMove].textContent = gameplay.computerMark;
          computerCanPlay = false;
          playerCanPlay = true;
          if (gameplay.isWining(gameplay.board)) {
            gameInfoArea.innerHTML = '<p>You lost!</p>';
            startAgain(gameplay);
            updateResult('computer');
          } else if(gameplay.isBoardFull()) {
            gameInfoArea.innerHTML = "<p>It's a tie!";
            startAgain(gameplay);
            updateResult('tie');
          }
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

var updateResult = function(result){
  if(result === 'computer'){
    let score = Number(localStorage.getItem('computer')) + 1;
    localStorage.setItem('computer', score);
    document.querySelector('#computerWin').innerHTML = ': ' + score;
  } else if (result === 'player'){
    let score = Number(localStorage.getItem('player')) + 1;
    localStorage.setItem('player', score);
    document.querySelector('#playerWin').innerHTML = ': ' + score;
  } else {
    let score = Number(localStorage.getItem('tie')) + 1;
    localStorage.setItem('tie', score);
    document.querySelector('#tie').innerHTML = ': ' + score;
  }

};

var showResults = function(){
  document.querySelector('#computerWin').innerHTML = ': ' + localStorage.getItem('computer');
  document.querySelector('#playerWin').innerHTML = ': ' + localStorage.getItem('player');
  document.querySelector('#tie').innerHTML = ': ' + localStorage.getItem('tie');
};

var startButton = document.querySelector('#start');
startButton.onclick = startGame;
showResults();

