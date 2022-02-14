/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray


/*------------------------ Cached Element References ------------------------*/
const gameTitle = document.querySelector('#game-title')

const playerName1 = document.querySelector('#input-player1')
const playerName2 = document.querySelector('#input-player2')
const theme = document.querySelector('.dropdown-menu')
const dropDownBtn = document.querySelector('#dropdownMenuButton2')
const playBtn = document.querySelector('#play-btn')
const startScreen = document.querySelector('#start-screen')

const startMenuBtn = document.querySelector('#start-menu-btn')
const resetBtn = document.querySelector('#reset-btn')
const gameBoard = document.querySelector('#game-board')
const sqInplay = document.querySelectorAll('.inplay')
const playScreen = document.querySelector('#play-screen')


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
  // console.log(squares)
  // boardArray.forEach((elem, idx) => {
  //   elem.forEach((el, i) => {
  //     if (el !== null){
  //       squares.forEach((sqEl, index) => {
  //         console.log(sqEl.id)
  //       })
  //     }
  //   })
  // })

  // console.log(boardArray[0][7])
  sqInplay.forEach((elem, idx) => {
    
    // console.log(elem.id)
    let num = elem.id
    console.log(num)
    let firstN = Number(num[0])
    let lastN = Number(num[1])
    if (boardArray[firstN][lastN] === 1){
      console.log('test if boardArray')
      elem.innerHTML = `<div id="one-piece"></div>`
    }
    if (boardArray[firstN][lastN] === -1){
      console.log('test if boardArray')
      elem.innerHTML = `<div id="two-piece"></div>`
    }
  })
  
}