//set gameboard as an array inside of a gameboard module
//const gameboard = (() => {
//  
//}

//set player as a factory

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
    'n', 'n', 'n',
    'n', 'n', 'n',
    'n', 'n', 'n',
  ];
  const addMove = (player, location) => {
    console.log(location);
    //player makes move here
    //update boardPositions array
  }
  return {
    addMove
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
const user = new player('paige', 'x');

//add an event listener onto each button
let gridItem = document.querySelectorAll('.gridItem');

function testFunc(){
  console.log('testing');
}

for(let i =0; i < gridItem.length; i++){
  gridItem[i].addEventListener('click', function(){
    gameBoard.addMove(user,);
  });
}