
//Winning Combinations
const WIN_COMBOS = [
  [0,1,2],
  [1,4,7],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

//Initial setup of a clear board, to use for comparison later.
const OG_BOARD_POSITIONS = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8,
];

//Setting the game tracker variables - one to track if the game has ended, one to keep track of whose turn it is
//a false turn is the user, a true turn is the computer
let endGame = false;
let turnTracker = false;

//Module used for updating the board
const gameBoard = (() => {
  //Initializing the board
  boardPositions = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];

  //Allows the player to add a move onto the board, or attempt to add a move
  const addMove = (player, location, label) => {
    if (endGame === false){
      //If the player is the computer, change the turntracker and update the location on boardPositions array, as well as the UI.
      if (player.name == 'demagotron'){
          turnTracker = false;
          boardPositions[location] = label;
          updateBoard(player, boardPositions, location, label);
  
      }
      //If the player is the user and the board item is not taken, update the location on boardPositions array and update the UI.
      if (player.name != 'demagotron'){
        if(gridItem[location].innerHTML.length == 0){
        turnTracker = true;
        boardPositions[location] = label;
        updateBoard(player, boardPositions, location, label);
        }
        else {
        console.log('not a legal move');
        }
      }
    }
  }

  //Update the UI of the board displayed on the HTML.
  const updateBoard = (player, boardPositions, location, label) => {
    //Adding a 2 second delay for the computer's moves - to make it seem like it's thinking :).
    if (player.name == 'demagotron'){
      setTimeout(function(){gridItem[location].innerHTML = label;},1000);
    }
    else{
      gridItem[location].innerHTML = label;
    }
    if (checkForWinner() == true){
        showWinner(player.name);
        endGame = true;
        showRestart();
    }
    else {
      if (checkForTie() == true){
        showWinner('tie');
        endGame = true;
        showRestart();
      }
    }
  }
  //Returns true in a tie game
  const checkForTie = () => {
    n = 0;
    diffCounter = 0;
    while (n < boardPositions.length){
      if (boardPositions[n] == OG_BOARD_POSITIONS[n]){
        return false;
      }
      else{
        diffCounter ++;
        n +=1;
        if (diffCounter == 9){
          return true;
        }
      }
    }
  }
  //Returns true if a winning combination is present
  const checkForWinner = () => {
    for(let k = 0; k < WIN_COMBOS.length; k++){
      let item = WIN_COMBOS[k];
      if (boardPositions[item[0]] == boardPositions[item[1]] && boardPositions[item[1]] == boardPositions[item[2]]){
        return true;
      }
    }
  }

  const clearGameBoard = () => {
    //Resets the boardPositions to its initial value.
    boardPositions = [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8,
    ];

    //Clears all of the labels from the UI.
    for(let a = 0; a < gridItem.length; a++){
      gridItem[a].innerHTML = '';
    }

    //Hide the refresh button again.
    restart.classList.add('hidden');
    restart.classList.remove('fade-in');

    //Sets trackers back to their defaults.
    endGame = false;
    turnTracker = false;

    //Hides the winner and refreshes the innerhtml
    announceWinner.classList.add('hidden');
    announceWinner.classList.remove('fade-in');
    announceWinner.innerHTML = '';
  }
  return {
    addMove,
    clearGameBoard,
    checkForTie,
    checkForWinner,
  };

})();

//Setting up the player constructor.
const player = (name, label) => {
  return { name, label }
}

//Displays the board on the screen.
function showBoard(){
  introGraphic.classList.add('slide_out');
  introGraphic.classList.add('hidden');
  gameBoardUI.classList.remove('hidden');
  gameBoardUI.classList.add('fade-in');
  gameBoardUI.classList.add('visible');
}

//Displays the restart button on the screen.
function showRestart(){
  restart.classList.remove('hidden');
  restart.classList.add('fade-in');
}

function showWinner(winner){
  if (winner == 'tie'){
    announceWinner.innerHTML = "It's a tie game!";
  }
  else {
    announceWinner.innerHTML = `${winner} has won!`;
  }
  announceWinner.classList.add('fade-in');
  announceWinner.classList.remove('hidden');
}

//Returns the empty index positions on the board.
function availablePositions(boardPositions){
  return boardPositions.filter(s => typeof s == 'number');
}

function bestSpot(){
  //return a random available square
  let emptySpots = availablePositions(boardPositions);

  /*
  let bestScore = 0;
  let bestMove = 0;

  for (k = 0; k < emptySpots.length; k++){

    newLocation = emptySpots[k];
    boardPositions[newLocation] = 'o';
    score = minimax(boardPositions,true);
    boardPositions[newLocation] = newLocation;


    if(score > bestScore){
      bestScore = score;
      bestMove = newLocation;
    }
  }
  return bestMove;*/
  return emptySpots[Math.floor(Math.random()*emptySpots.length)];
}

function minimax(boardPositions, isMaximizing){
  if (gameBoard.checkForWinner() && (isMaximizing == true)){
    return 1;
  }
  else if (gameBoard.checkForWinner() && (isMaximizing == false)){
    return -1;
  }
  else if (gameBoard.checkForTie()){
    return 0;
  }
  let emptySpots = availablePositions(boardPositions);
  if (isMaximizing == false){
    let bestScore = 0;
    for (k = 0; k < emptySpots.length; k++){
      newLocation = emptySpots[k];
  
      boardPositions[newLocation] = 'o';
      score = minimax(boardPositions,false);
      boardPositions[newLocation] = location;
      if(score < bestScore){
        bestScore = score;
      }
    }
    return bestScore;
  }
  else{
    let bestScore = 0;
    for (k = 0; k < emptySpots.length; k++){
      newLocation = emptySpots[k];
  
      boardPositions[newLocation] = 'x';
      score = minimax(boardPositions,true);
      boardPositions[newLocation] = location;
      if(score < bestScore){
        bestScore = score;
      }
    }
    return bestScore;

  }
}
  
//Adds event listeners on all of the grid items.
let gridItem = document.querySelectorAll('.gridItem');
  for(let i =0; i < gridItem.length; i++){
    gridItem[i].addEventListener('click', function(){
      gameBoard.addMove(user, gridItem[i].id, user.label);
      //If it is the computer's turn, use the bestSpot function to find the location of the grid item.
      if (turnTracker === true){
        gameBoard.addMove(computer, bestSpot(), computer.label);
      }
    });
  }

let restart = document.getElementById('restartButton');
restart.addEventListener('click', gameBoard.clearGameBoard);

let announceWinner = document.getElementById('winner_announcement');


const introGraphic = document.querySelector('.intro');
const gameBoardUI = document.getElementById('gameBoard');
document.addEventListener('click', showBoard);


const user = player('paige', 'x');
const computer = player('demagotron', 'o');
