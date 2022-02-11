/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray


/*------------------------ Cached Element References ------------------------*/
const playerName1 = document.querySelector('#input-player1')
const playerName2 = document.querySelector('#input-player2')
const theme = document.querySelector('.dropdown-item')


/*----------------------------- Event Listeners -----------------------------*/
document.querySelector('#play-btn').addEventListener('click', init)


/*-------------------------------- Functions --------------------------------*/

function init(){
  console.log(playerName1.value)
  console.log(playerName2.value)

}
