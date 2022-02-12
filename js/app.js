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
const gameTitle = document.querySelector('#game-title')


/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', () => {
  init();
  render();
  // showPlayScreen();
  screenSwap();
})
startMenuBtn.addEventListener('click', () => {
  init();
  // showStartScreen();
  screenSwap();
})
resetBtn.addEventListener('click', init)
theme.addEventListener('click', selectTheme)

// element.addEventListener('event',() => {    
//   invokeMe();
//   alsoInvokeMe();    
// });

// setTimeout accepts a callback & how long to wait before calling the cb
// setTimeout(function() {
//   colors.forEach(function(color, idx) {
//     console.log(`${idx + 1} - ${color}`)
//   })
// }, 1000)  // 1000 milliseconds (1 sec)

/*-------------------------------- Functions --------------------------------*/
// init()
firstScreenLoadUp()
function firstScreenLoadUp(){
  gameTitle.classList.add('animate__fadeInDown')
  startScreen.classList.add('animate__fadeInDown')
  playScreen.classList.add('animate__fadeOutDown')
  playScreen.setAttribute('hidden', true)
  
}

function screenSwap(){
  startScreen.classList.toggle('animate__fadeInDown')
  startScreen.classList.toggle('animate__fadeOutUp')
  playScreen.classList.toggle('animate__fadeInUp')
  playScreen.classList.toggle('animate__fadeOutDown')
  setTimeout(function(){
    playScreen.toggleAttribute('hidden')
    startScreen.toggleAttribute('hidden')
  }, 300)
  
}

function init(){
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

function selectTheme(evt){
  console.log(evt.target.innerHTML)
  dropDownBtn.innerHTML = evt.target.innerHTML

}

function render(){

}