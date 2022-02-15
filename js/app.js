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
const displayName1 = document.querySelector('#display-name-1')
const displayName2 = document.querySelector('#display-name-2')


/*----------------------------- Event Listeners -----------------------------*/
playBtn.addEventListener('click', () => {
  init();
  screenSwap();
})
startMenuBtn.addEventListener('click', () => {
  init();
  screenSwap();
})

resetBtn.addEventListener('click', init)
theme.addEventListener('click', selectTheme)

sqInplay.forEach((elem) => {
  elem.addEventListener('click', playerMove)
})

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
  resetHighlight();
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
  if (playerName1.value === ''){
    displayName1.innerHTML = 'Player 1'
  } else{
    displayName1.innerHTML = playerName1.value
  }
  if (playerName2.value === ''){
    displayName2.innerHTML = 'Player 2'
  } else{
    displayName2.innerHTML = playerName2.value
  }

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

  if (turn === 1){  
    displayName1.style.color = 'red'
    displayName2.style.color = ''
  } else {
    displayName1.style.color = ''
    displayName2.style.color = 'red'
  }
}

function playerMove(evt){
  if (turn === 1){
    if (evt.target.className === 'one-piece'){
      getPieceId(evt);
      resetHighlight();
      evt.target.parentElement.classList.toggle('highlight')
    }
    
    if (evt.target.className === 'square inplay' && pieceId !== null){
      getTargetId(evt);
      resetHighlight(evt);
      movePiece();
    }
  } else {
    if (evt.target.className === 'two-piece'){
      getPieceId(evt);
      resetHighlight(evt);
      evt.target.parentElement.classList.toggle('highlight')
    }
    
    if (evt.target.className === 'square inplay' && pieceId !== null){
      getTargetId(evt);
      resetHighlight(evt);
      movePiece();
    }
  }
}

function getPieceId(evt){
  pieceId = evt.target.id
  pieceFirstN = Number(pieceId[0])
  pieceLastN = Number(pieceId[1])
}

function getTargetId(evt){
  targetId = evt.target.id
  targetFirstN = Number(targetId[0])
  targetLastN = Number(targetId[1])
}

function resetHighlight(){
  sqInplay.forEach((elem) =>{
    elem.classList.remove('highlight')
  })
}

function movePiece(){
  if (pieceLastN % 2 === 0){
    if (moveCond(-1)){
      updateBoard();
    } else{
      jumpPieceEven();
      resetPieceInfo();
    }
  }else {
    if (moveCond(1)){
      updateBoard();
    } else{
      jumpPieceOdd();
      resetPieceInfo();
    }
  }
}

function moveCond(num) {
  if (targetLastN === (pieceLastN+turn) && (targetFirstN === pieceFirstN || targetFirstN === (pieceFirstN+num)) && (boardArray[targetFirstN][targetLastN] === null)){
    return true
  } else {
    return false
  }
}

function updateBoard(){
  boardArray[targetFirstN][targetLastN] = turn;
  boardArray[pieceFirstN][pieceLastN] = null;
  turn *= -1
  render();
  resetPieceInfo();
}

function jumpPieceEven(){
  if ((boardArray[targetFirstN][targetLastN] === null) && (targetLastN === pieceLastN+(turn*2)) && (targetFirstN === pieceFirstN+1 || targetFirstN === pieceFirstN-1)){
    console.log('test if board elem is null for jumping')
    if (targetFirstN === pieceFirstN-1 && boardArray[targetFirstN][targetLastN-turn] === (turn*-1)){
      boardArray[targetFirstN][targetLastN-turn] = null;
      updateBoard();
      // even last num jumping left
    }
    if (targetFirstN === pieceFirstN+1 && boardArray[pieceFirstN][pieceLastN+turn] === (turn*-1)){
      boardArray[pieceFirstN][pieceLastN+turn] = null;
      updateBoard();
      // even last num jumping right
    }
  }
}

function jumpPieceOdd(){
  if ((boardArray[targetFirstN][targetLastN] === null) && (targetLastN === pieceLastN+(turn*2)) && (targetFirstN === pieceFirstN+1 || targetFirstN === pieceFirstN-1)){
    console.log('test if board elem is null for jumping')
    if (targetFirstN === pieceFirstN-1 && boardArray[pieceFirstN][pieceLastN+turn] === (turn*-1)){
      boardArray[pieceFirstN][pieceLastN+turn] = null;
      updateBoard();
      // odd last num jumping left
    }
    if (targetFirstN === pieceFirstN+1 && boardArray[targetFirstN][targetLastN-turn] === (turn*-1)){
      boardArray[targetFirstN][targetLastN-turn] = null;
      updateBoard();
      // odd last num jumping right
    }
  }
}
