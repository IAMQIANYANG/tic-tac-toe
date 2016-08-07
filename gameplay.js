/**
 * Created by pandachain on 2016-08-05.
 */

var Gameplay = function(){

 var self = {};
  self.board = ['', '', '', '', '', '', '', '', ''];
  self.playerMark = '';
  self.computerMark ='';

  self.chooseAndAssignMark =  function(mark){
     self.playerMark = mark;
    if (mark === 'O'){
      self.computerMark = 'X';
    } else if (mark === 'X') {
      self.computerMark = 'O';
    }
   };

  self.copyCurrentBoard = function() {
    var boardCopy = [];
    self.board.forEach(function(mark){
      boardCopy.push(mark);
    });
    return boardCopy;
  };

  self.chooseRandomPosition = function(list){
    var availableMoves = [];
    list.forEach(function(e){
      if (self.isSpaceFree(self.board, e)){
        availableMoves.push(e);
      }
    });

    if(availableMoves.length > 0){
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    } else {
      return 'No';
    }
  };
  
  self.setMove = function(id){
    self.board[id] = self.computerMark;
  };

  self.setPlayerMove = function(id){
    self.board[id] = self.playerMark;
  };
  
  self.getAndSetComputerMove = function () {

    //1. check if computer can win in the next move;
    for (var i = 0; i < 9; i++) {
      var copyBoard = self.copyCurrentBoard();
      if (self.isSpaceFree(copyBoard, i)) {
        copyBoard[i] = self.computerMark;
        if (self.isWining(copyBoard)) {
          self.setMove(i);
          return i
        }
      }
    }


    //2. check if the player can win in the next move;
    for (var j = 0; j < 9; j++) {
      var copyBoard2 = self.copyCurrentBoard();
      if (self.isSpaceFree(copyBoard2, j)) {
        copyBoard2[j] = self.playerMark;
        if (self.isWining(copyBoard2)) {
          self.setMove(j);
          return j
        }
      }
    }

    //3. put on one of the corners, if free
    var position = self.chooseRandomPosition([0, 2, 6, 8]);
    if (position !== 'No') {
      self.setMove(position);
      return position
    }

    //4. put on center, if free
    if (self.isSpaceFree(self.board, 4)) {
      self.setMove(4);
      return 4;
    }

    //5. put on one of the sides, if free
    var newPosition = self.chooseAndAssignMark([1, 3, 5, 7]);
    if(newPosition !== 'No'){
      self.setMove(newPosition);
      return newPosition
    }

    };

  self.isSpaceFree = function(board, id){
    return board[id] === '';
  };

  self.isWining = function(board){
    for (var i = 0; i <=6; i += 3){
      if(!self.isSpaceFree(board, i) && board[i] === board[i+1] && board[i] === board[i+2]) {
        return true;
      }
    }

    for (var j = 0; j <= 2; j++){
      if(!self.isSpaceFree(board, j) && board[j] === board[j+3] && board[j] === board[j+6]) {
        return true;
      }
    }

    if(!self.isSpaceFree(board, 0) && board[0] === board[4] && board[0] === board[8]) {
      return true;
    } else {
      return (!self.isSpaceFree(board, 2) && board[2] === board[4] && board[2] === board[6])
    }
   };

  self.isBoardFull = function(){
    return (self.board.indexOf('') === -1)
  };

  self.reset  = function(){
    self.board = ['', '', '', '', '', '', '', '', ''];
  };

  return self;

};

