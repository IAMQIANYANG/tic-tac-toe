/**
 * Created by pandachain on 2016-08-06.
 */

// this file uses scripts from gameplay.js

var currentPlayerMark = '';

//select all board positions;
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
    gameInfoArea.innerHTML = '<p class="info">You start!</p>';
  } else if(document.querySelector('#O').checked === true) {
    currentPlayerMark = document.querySelector('#O').value;
    gameInfoArea.innerHTML = '<p class="info">Computer start!</p>';
  }
  var newGame = Gameplay();
  newGame.chooseAndAssignMark(currentPlayerMark);
  play(newGame);
};

//add the two variables to allow only one player each turn
var computerCanPlay = false;
var playerCanPlay = true;

//if player chooses 'O', computer makes first move;
var computerMakeFirstMove = function(gameplay){
  if (gameplay.playerMark === 'O'){
    var firstMove = gameplay.getAndSetComputerMove();
    currentGameBoard[firstMove].textContent = gameplay.computerMark;
  }
};

//control the flow of the game;
var play = function(gameplay){

  computerMakeFirstMove(gameplay);

  //add event listeners to each position on the board;
  //if a position is free, play can take that position
  //after player made a valid move, computer can start to play
  currentGameBoard.forEach(function (boardPosition, positionIndex) {
    boardPosition.addEventListener('click', function () {
      if(gameplay.isSpaceFree(gameplay.board, positionIndex) && playerCanPlay){
        boardPosition.textContent = gameplay.playerMark;
        var playerMove = currentGameBoard.indexOf(this);
        gameplay.setPlayerMove(playerMove);
        computerCanPlay = true;
        playerCanPlay = false;
      }
      
      //after play's each move, check if player wins or if it's a tie
      //if not, computer can play
      //after computer played, allow player to play
      if (gameplay.isWining(gameplay.board)) {
        gameInfoArea.innerHTML = '<p class="win">You won!</p>';
        startAgain(gameplay);
        updateResult('player');
      } else if (gameplay.isBoardFull()) {
        gameInfoArea.innerHTML = "<p class='info'>It's a tie!</p>";
        startAgain(gameplay);
        updateResult('tie');

      } else {
        if (computerCanPlay) {
          var computerMove = gameplay.getAndSetComputerMove();
          currentGameBoard[computerMove].textContent = gameplay.computerMark;
          computerCanPlay = false;
          playerCanPlay = true;
          
          // after computer's each move, check if computer wins of if it's a tie
          if (gameplay.isWining(gameplay.board)) {
            gameInfoArea.innerHTML = '<p class="loss">You lost!</p>';
            startAgain(gameplay);
            updateResult('computer');
          } else if(gameplay.isBoardFull()) {
            gameInfoArea.innerHTML = "<p class='info'>It's a tie!</p>";
            startAgain(gameplay);
            updateResult('tie');
          }
        }
      }
    })
  })
};


var startAgain = function(gameplay){
  computerCanPlay = false;
  playerCanPlay = true;
  clearBoard();
  gameplay.reset();
  computerMakeFirstMove(gameplay);
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

