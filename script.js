
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
//module used for keeping track of and updating board positions
const gameBoard = (() => {
  boardPositions = [
    'x', '', '',
    '', 'x', '',
    '', '', 'x',
  ];
  const addMove = (player, location, label) => {
    boardPositions[location] = label;
    updateBoard(boardPositions, location, label);
    //player makes move here
    //update boardPositions array
  }
  const updateBoard = (boardPositions, location, label) => {
    gridItem[location].innerHTML = label;
  }
  return {
    addMove,
    updateBoard
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

const introGraphic = document.querySelector('.intro');
const gameBoardUI = document.getElementById('gameBoard');
document.addEventListener('click', showBoard);

//create new user player
//we could adjust the name here to be == to input from DOM
const user = player('paige', 'x');
const computer = player('demagotron', 'o');

//add an event listener onto each button
let gridItem = document.querySelectorAll('.gridItem');
for(let i =0; i < gridItem.length; i++){
  gridItem[i].addEventListener('click', function(){
    //pass in the user info, as well as id of grid item pressed on
    gameBoard.addMove(user, gridItem[i].id, user.label);
  });
}