/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray


/*------------------------ Cached Element References ------------------------*/
const playerName1 = document.querySelector('#input-player1')
const playerName2 = document.querySelector('#input-player2')
const theme = document.querySelector('.dropdown-item')


/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('#play-btn').addEventListener('click', init)
document.querySelector('#start-menu-btn').addEventListener('click', init)
document.querySelector('#reset-btn').addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/

function init(){
  // console.log(playerName1.value)
  // console.log(playerName2.value)
  turn = 1
  winner = null
  boardArray = [
    [1, 1, 1, null, null, -1, -1, -1],  // array 0
    [1, 1, 1, null, null, -1, -1, -1],  // array 1
    [1, 1, 1, null, null, -1, -1, -1],  // array 2
    [1, 1, 1, null, null, -1, -1, -1]   // array 3
  ]
}
