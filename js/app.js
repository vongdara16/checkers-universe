/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray


/*------------------------ Cached Element References ------------------------*/
const playerName1 = document.querySelector('#input-player1')
const playerName2 = document.querySelector('#input-player2')
const theme = document.querySelector('.dropdown-item')
const playBtn = document.querySelector('#play-btn')
const startMenuBtn = document.querySelector('#start-menu-btn')
const resetBtn = document.querySelector('#reset-btn')
const startScreen = document.querySelector('#start-screen')
const playScreen = document.querySelector('#play-screen')


/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', init)
startMenuBtn.addEventListener('click', init)
resetBtn.addEventListener('click', init)


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
  startScreen.style.visibility = 'visible'
  playScreen.style.visibility = 'hidden'
}

