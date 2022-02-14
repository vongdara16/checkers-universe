/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray

let pieceId, pieceFirstN, pieceLastN, targetId, targetFirstN, targetLastN



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
// const names = document.querySelectorAll('.name')

// const onePiece = document.querySelectorAll('.one-piece')
// const twoPiece = document.querySelectorAll('.two-piece')


/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', () => {
  init();
  // render();
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

// gameBoard.addEventListener('click', playerMove)

// onePiece.forEach((elem) =>{
//   elem.addEventListener('click', selectPiece)
// })

// twoPiece.forEach((elem) =>{
//   elem.addEventListener('click', selectPiece)
// })

sqInplay.forEach((elem) => {
  elem.addEventListener('click', playerMove)
})

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
  render();
  resetPieceInfo();
}

function resetPieceInfo(){
  pieceId = null
  pieceFirstN = null
  pieceLastN = null
  targetId = null
  targetFirstN = null
  targetLastN = null
}

function selectTheme(evt){
  console.log(evt.target.innerHTML)
  dropDownBtn.innerHTML = evt.target.innerHTML

}

function render(){

  let name1 = playerName1.value
  let name2 = playerName2.value
  if (name1 === ''){
    document.querySelector('#display-name-1').innerHTML = 'Player 1'
  } else{
    document.querySelector('#display-name-1').innerHTML = name1
  }
  if (name2 === ''){
    document.querySelector('#display-name-2').innerHTML = 'Player 2'
  } else{
    document.querySelector('#display-name-2').innerHTML = name2
  }
  // document.querySelector('#player-2-name').innerHTML = name2

  sqInplay.forEach((elem) => {
    let num = elem.id
    let firstN = Number(num[0])
    let lastN = Number(num[1])
    if (boardArray[firstN][lastN] === 1){
      elem.innerHTML = `<div class="one-piece" id="${firstN}${lastN}">${firstN}${lastN}</div>`
    }
    if (boardArray[firstN][lastN] === -1){
      elem.innerHTML = `<div class="two-piece" id="${firstN}${lastN}">${firstN}${lastN}</div>`
    }
    if (boardArray[firstN][lastN] === null){
      elem.innerHTML = ``
    }
  })

}

function playerMove(evt){
  if (turn === 1){
    if (evt.target.className === 'one-piece'){
      pieceId = evt.target.id
      pieceFirstN = Number(pieceId[0])
      pieceLastN = Number(pieceId[1])
      console.log(pieceId, 'pieceId', pieceFirstN, 'first', pieceLastN, 'last')
    } else if(evt.target.className === 'square inplay' && pieceId !== null){
      console.log('test inplay square')
      targetId = evt.target.id
      targetFirstN = Number(targetId[0])
      targetLastN = Number(targetId[1])
      console.log(targetId, 'targId', targetFirstN, 'targFirst', targetLastN, 'targLast')
    }
    if (pieceLastN % 2 === 0){
      if (targetLastN === pieceLastN+1 && (targetFirstN === pieceFirstN || targetFirstN === pieceFirstN-1)){
        boardArray[targetFirstN][targetLastN] = 1;
        boardArray[pieceFirstN][pieceLastN] = null;
        render();
        resetPieceInfo();
        turn *= -1
        // console.log('test if state')
      }
    }else {
      if (targetLastN === pieceLastN+1 && (targetFirstN === pieceFirstN || targetFirstN === pieceFirstN+1)){
        boardArray[targetFirstN][targetLastN] = 1;
        boardArray[pieceFirstN][pieceLastN] = null;
        render();
        resetPieceInfo();
        turn *= -1
        // console.log('test if state')
      }
    }
  } else {
    if (evt.target.className === 'two-piece'){
      pieceId = evt.target.id
      pieceFirstN = Number(pieceId[0])
      pieceLastN = Number(pieceId[1])
      console.log(pieceId, 'pieceId', pieceFirstN, 'first', pieceLastN, 'last')
    } else if(evt.target.className === 'square inplay' && pieceId !== null){
      console.log('test inplay square')
      targetId = evt.target.id
      targetFirstN = Number(targetId[0])
      targetLastN = Number(targetId[1])
      console.log(targetId, 'targId', targetFirstN, 'targFirst', targetLastN, 'targLast')
    }
    if (pieceLastN % 2 === 0){
      if (targetLastN === pieceLastN-1 && (targetFirstN === pieceFirstN || targetFirstN === pieceFirstN-1)){
        boardArray[targetFirstN][targetLastN] = -1;
        boardArray[pieceFirstN][pieceLastN] = null;
        render();
        resetPieceInfo();
        turn *= -1
        // console.log('test if state')
      }
    }else {
      if (targetLastN === pieceLastN-1 && (targetFirstN === pieceFirstN || targetFirstN === pieceFirstN+1)){
        boardArray[targetFirstN][targetLastN] = -1;
        boardArray[pieceFirstN][pieceLastN] = null;
        render();
        resetPieceInfo();
        turn *= -1
        // console.log('test if state')
      }
    }
    // if (targetLastN === pieceLastN-1){
    //   boardArray[targetFirstN][targetLastN] = -1;
    //   boardArray[pieceFirstN][pieceLastN] = null;
    //   render();
    //   resetPieceInfo();
    //   turn *= -1
    // }
  }
}

function jumpPiece(){

}