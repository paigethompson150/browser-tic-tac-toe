//set gameboard as an array inside of a gameboard module
//const gameboard = (() => {
//  
//}

//set player as a factory


function showBoard(){
  console.log('test');
  introGraphic.classList.add('slide_out');
  introGraphic.classList.add('hidden');
  gameBoard.classList.remove('hidden');
  gameBoard.classList.add('fade-in');
  gameBoard.classList.add('visible');

}
const introGraphic = document.querySelector('.intro');
const gameBoard = document.getElementById('gameBoard');
document.addEventListener('click', showBoard);