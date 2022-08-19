
//winning combinations
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

const OG_BOARD_POSITIONS = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8,
];

let endGame = false;
let turnTracker = false;
//module used for keeping track of and updating board positions
const gameBoard = (() => {
  boardPositions = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8,
  ];
  const addMove = (player, location, label) => {
    //if no winner has been declared yet
    if (endGame === false){
      //if it's the computer - check if the random space is filled before switching turns
      if (player.name == 'demagotron'){

          turnTracker = false;
          boardPositions[location] = label;
          updateBoard(player, boardPositions, location, label);
  
      }
      if (player.name != 'demagotron'){
        if((boardPositions[location] == OG_BOARD_POSITIONS[location])){
        turnTracker = true;
        boardPositions[location] = label;
        updateBoard(player, boardPositions, location, label);
        }
        else {
        console.log('not a legal move');
        }
      }
    }
    //player makes move here
    //update boardPositions array
  }
  const updateBoard = (player, boardPositions, location, label) => {
    //if the it is the computer, add a 2 second delay
    if (player.name == 'demagotron'){
      setTimeout(function(){gridItem[location].innerHTML = label;},1000);
    }
    else{
      gridItem[location].innerHTML = label;
    }
    if (checkForWinner(player, boardPositions) == true){
        console.log(player.name + 'wins');
        endGame = true;
        showRestart();
    }
    else {
      if (checkForTie(player, boardPositions) == true){
        console.log('its a tie!');
        endGame = true;
        showRestart();
      }
    }
  }
  const checkForTie = (player, boardPositions) => {
    n = 0;
    diffCounter = 0;
    while (n < boardPositions.length){
      if (boardPositions[n] == OG_BOARD_POSITIONS[n]){
        return false;
      }
      else{
        diffCounter ++;
        console.log(diffCounter);
        n +=1;
        if (diffCounter == 9){
          return true;
        }
      }
    }
  }

  const checkForWinner = (player, boardPositions) => {
    for(let k = 0; k < WIN_COMBOS.length; k++){
      let item = WIN_COMBOS[k];
      if (boardPositions[item[0]] == boardPositions[item[1]] && boardPositions[item[1]] == boardPositions[item[2]]){
        return true;
      }
    }
  }

  const clearGameBoard = () => {
    //refresh board positions
    boardPositions = [
      0, 1, 2,
      3, 4, 5,
      6, 7, 8,
    ];

    //clear all the labels from the page
    for(let a = 0; a < gridItem.length; a++){
      gridItem[a].innerHTML = '';
    }

    //set trackers back to their defaults
    endGame = false;
    turnTracker = false;

    //hide the refresh button again
    restart.classList.add('hidden');
  }
  return {
    addMove,
    clearGameBoard,
  };

})();

//name can either be user/computer, label is x or o
const player = (name, label) => {
  return { name, label }
}


function showBoard(){
  introGraphic.classList.add('slide_out');
  introGraphic.classList.add('hidden');
  gameBoardUI.classList.remove('hidden');
  gameBoardUI.classList.add('fade-in');
  gameBoardUI.classList.add('visible');
}

function showRestart(){
  restart.classList.remove('hidden');
  restart.classList.add('fade-in');
}

function availablePositions(){
  return boardPositions.filter(s => typeof s == 'number');
}

function bestSpot(){
  //return first empty square
  emptySpots = availablePositions();
  return emptySpots[Math.floor(Math.random()*emptySpots.length)];
}

let gridItem = document.querySelectorAll('.gridItem');
  for(let i =0; i < gridItem.length; i++){
    gridItem[i].addEventListener('click', function(){
      //pass in the user info, as well as id of grid item pressed on
      gameBoard.addMove(user, gridItem[i].id, user.label);
      if (turnTracker === true){
        gameBoard.addMove(computer, bestSpot(), computer.label);
      }
    });
  }

let restart = document.getElementById('restartButton');
restart.addEventListener('click', gameBoard.clearGameBoard)

const introGraphic = document.querySelector('.intro');
const gameBoardUI = document.getElementById('gameBoard');
document.addEventListener('click', showBoard);

//create new user player
//we could adjust the name here to be == to input from DOM
const user = player('paige', 'x');
const computer = player('demagotron', 'o');
