
//winning combinations
const WIN_COMBOS = [
  [0,1,2],
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
        if (boardPositions[location] != OG_BOARD_POSITIONS[location]){
          //if space is already full, go again.
          gameBoard.addMove(computer, bestMove(), computer.label);
        }
        else {
          turnTracker = false;
          boardPositions[location] = label;
          updateBoard(player, boardPositions, location, label);
        }
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
      console.log('location is ' + location);
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
    for(let n = 0; n < boardPositions.length; n++){
      if (boardPositions[n] == OG_BOARD_POSITIONS[n]){
        return false;
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
    checkForWinner,
    checkForTie,
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

//spot for our minimax algorithm
function bestMove(){
  let bestScore = -Infinity;
  let bestPos;
  for (let i = 0; i < boardPositions.length-1; i++){
    if (typeof boardPositions[i] == 'number'){
      boardPositions[i] = 'o';
      let score = minimax(boardPositions);
      boardPositions[i] = i;
      if (score > bestScore) {
        bestScore = score;
        bestMove = boardPositions[i];
      }
    }
  
  }
  //return availablePositions()[0];
  //return minimax(boardPositions, computer).index;
  return bestPos;
}

function minimax(board){
  return 1;
}

let gridItem = document.querySelectorAll('.gridItem');
for(let i =0; i < gridItem.length; i++){
  gridItem[i].addEventListener('click', function(){
    //pass in the user info, as well as id of grid item pressed on
    gameBoard.addMove(user, gridItem[i].id, user.label);
    if (turnTracker === true){
      gameBoard.addMove(computer, bestMove(), computer.label);
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
