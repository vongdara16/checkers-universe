/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray


/*------------------------ Cached Element References ------------------------*/
const playerName1 = document.querySelector('#input-player1')
const playerName2 = document.querySelector('#input-player2')
const theme = document.querySelector('.dropdown-menu')
const dropDownBtn = document.querySelector('#dropdownMenuButton2')
const playBtn = document.querySelector('#play-btn')
const startMenuBtn = document.querySelector('#start-menu-btn')
const resetBtn = document.querySelector('#reset-btn')
const startScreen = document.querySelector('#start-screen')
const playScreen = document.querySelector('#play-screen')


/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', () => {
  render();
  showPlayScreen();
})
startMenuBtn.addEventListener('click', () => {
  init();
  showStartScreen();
})
resetBtn.addEventListener('click', init)
theme.addEventListener('click', selectTheme)


// element.addEventListener('event',() => {    
//   invokeMe();
//   alsoInvokeMe();    
// });

/*-------------------------------- Functions --------------------------------*/
init()

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
  console.log('test init')
}

function showStartScreen(){
  // startScreen.setAttribute('hidden', false)
  playScreen.setAttribute('hidden', true)
  startScreen.removeAttribute('hidden')
}

function showPlayScreen(){
  startScreen.setAttribute('hidden', true)
  // playScreen.style.visibility = 'visible'
  playScreen.removeAttribute('hidden')
}

function selectTheme(evt){
  console.log(evt.target.innerHTML)
  dropDownBtn.innerHTML = evt.target.innerHTML

}

function render(){

}