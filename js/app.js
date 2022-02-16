/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray

let pieceId, pieceFirstN, pieceLastN, targetId, targetFirstN, targetLastN

let chosenTheme

let p1Pieces, p2Pieces

let pieceClass

/*------------------------ Cached Element References ------------------------*/
const gameTitle = document.querySelector('#game-title')
const body = document.querySelector('body')

const playerName1 = document.querySelector('#input-player1')
const playerName2 = document.querySelector('#input-player2')
const theme = document.querySelector('.dropdown-menu')
const dropDownBtn = document.querySelector('#dropdownMenuButton2')
const playBtn = document.querySelector('#play-btn')
const startScreen = document.querySelector('#start-screen')

const startMenuBtn = document.querySelector('#start-menu-btn')
const resetBtn = document.querySelector('#reset-btn')
const gameBoard = document.querySelector('#game-board') // may not be needed
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
  // body.classList.add('animate__fadeInDown')
  playScreen.setAttribute('hidden', true)
  
}

function screenSwap(){
  startScreen.classList.toggle('animate__fadeInDown')
  startScreen.classList.toggle('animate__fadeOutUp')
  playScreen.classList.toggle('animate__fadeInUp')  // set timers for changing screens 
  playScreen.classList.toggle('animate__fadeOutDown')
  // body.classList.toggle('animate__fadeInDown') 
  // body.classList.toggle('animate__fadeOutUp')
  // set timers for allowing the body to change first. then the board will appear after. 
  setTimeout(function(){
    playScreen.toggleAttribute('hidden')
    startScreen.toggleAttribute('hidden')
  }, 300)

  setTimeout(function(){
    playScreen.classList.toggle(`${chosenTheme}`)
  }, 1000)
}

function selectTheme(evt){
  console.log(evt.target.innerHTML)
  dropDownBtn.innerHTML = evt.target.innerHTML
  chosenTheme = evt.target.innerHTML.toLowerCase()
  console.log(chosenTheme)
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
  // console.log(boardArray)
  p1Pieces = 12
  p2Pieces = -12
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
    if (boardArray[firstN][lastN] === 2){
      elem.innerHTML = `<div class="one-king" id="${firstN}${lastN}">${firstN}${lastN}</div>`
    }
    if (boardArray[firstN][lastN] === -2){
      elem.innerHTML = `<div class="two-king" id="${firstN}${lastN}">${firstN}${lastN}</div>`
    }
  })

  if (turn === 1){  
    displayName1.style.color = 'red'
    displayName2.style.color = ''
  } else {
    displayName1.style.color = ''
    displayName2.style.color = 'red'
  }

  checkJump();
  getWinner();
}

function playerMove(evt){
  if (turn === 1){
    if (evt.target.className === 'one-piece' || evt.target.className === 'one-king'){
      getPieceId(evt);
      resetHighlight();
      evt.target.parentElement.classList.toggle('highlight')
    }
    
    if (evt.target.className === 'square inplay' && pieceId !== null){
      getTargetId(evt);
      resetHighlight();
      movePiece();
      // resetJumpable();
    }
  } else {
    if (evt.target.className === 'two-piece' || evt.target.className === 'two-king'){
      getPieceId(evt);
      resetHighlight();
      evt.target.parentElement.classList.toggle('highlight')
    }
    
    if (evt.target.className === 'square inplay' && pieceId !== null){
      getTargetId(evt);
      resetHighlight();
      movePiece();
    }
  }
}

function getPieceId(evt){
  pieceClass = evt.target.className
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

function resetJumpable(){
  sqInplay.forEach((elem) =>{
    elem.classList.remove('jumpable')
  })
}

function movePiece(){
  if (pieceClass === 'one-king' || pieceClass === 'two-king'){
    if (pieceLastN % 2 === 0){
      if (moveKingCond(-1)){
        updateBoard();
        // resetJumpable();
      } else if (jumpKingCond()){
        jumpPieceEven();
        jumpKingEven();
        // resetJumpable();
      } else {
        resetPieceInfo();
      }
    }else {
      if (moveKingCond(1)){
        updateBoard();
        // resetJumpable();
      } else if (jumpKingCond()){
        jumpPieceOdd();
        jumpKingOdd();
        // resetJumpable();
      } else {
        resetPieceInfo();
      }
    }
  } else {
    if (pieceLastN % 2 === 0){
      if (moveCond(-1)){
        updateBoard();
        // resetJumpable();
      } else if (jumpCond()){
        jumpPieceEven();
        // resetJumpable();
      } else {
        resetPieceInfo();
      }
    }else {
      if (moveCond(1)){
        updateBoard();
        // resetJumpable();
      } else if (jumpCond()){
        jumpPieceOdd();
        // resetJumpable();
      } else {
        resetPieceInfo();
      }
    }
  }
}

function updateBoard(){
  if (boardArray[pieceFirstN][pieceLastN] === 2 || boardArray[pieceFirstN][pieceLastN] === -2 ){
    boardArray[targetFirstN][targetLastN] = turn*2;
    boardArray[pieceFirstN][pieceLastN] = null;
    turn *= -1;
    render();
    // resetJumpable();
    resetPieceInfo();

  } else {
    boardArray[targetFirstN][targetLastN] = turn;
    boardArray[pieceFirstN][pieceLastN] = null;
    turn *= -1;
    kingMe();
    render();
    // resetJumpable();
    resetPieceInfo();
    // resetJumpable();
  }
}

function kingMe(){
  boardArray.forEach((array, i) => {
    array.forEach((elem, idx) => {
      if (elem === 1 && idx === 7){
        boardArray[i][idx] = 2
        console.log('king me')
      }
      if (elem === -1 && idx === 0){
        boardArray[i][idx] = -2
        console.log('im king')
      }
    })
  })
}

function moveCond(num) {
  if (targetLastN === (pieceLastN+turn) && (targetFirstN === pieceFirstN || targetFirstN === (pieceFirstN+num)) && (boardArray[targetFirstN][targetLastN] === null)){
    return true
  } else {
    return false
  }
}

function moveKingCond(num){
  if ((targetLastN === (pieceLastN+turn) || targetLastN === (pieceLastN-turn)) &&(targetFirstN === pieceFirstN || targetFirstN === (pieceFirstN+num)) && (boardArray[targetFirstN][targetLastN] === null)){
    console.log('king is true')
    return true
  } else {
    console.log('king is false')
    return false
  }
}

function jumpCond(){
  if ((boardArray[targetFirstN][targetLastN] === null) && (targetLastN === pieceLastN+(turn*2)) && (targetFirstN === pieceFirstN+1 || targetFirstN === pieceFirstN-1)){
    return true
  } else {
    return false
  }
}
function jumpKingCond(){
  if ((boardArray[targetFirstN][targetLastN] === null) && (targetLastN === pieceLastN+(turn*2) || targetLastN === pieceLastN-(turn*2)) && (targetFirstN === pieceFirstN+1 || targetFirstN === pieceFirstN-1)){
    console.log('jking is true')
    return true
  } else {
    console.log('jking is false')
    return false
  }
}

function jumpPieceEven(){
  if (targetFirstN === pieceFirstN-1 && (boardArray[targetFirstN][targetLastN-turn] === (turn*-1) || boardArray[targetFirstN][targetLastN-turn] === (turn*-2))){
    boardArray[targetFirstN][targetLastN-turn] = null;
    pieceCount();
    updateBoard();
    // even last num jumping left
  }
  if (targetFirstN === pieceFirstN+1 && (boardArray[pieceFirstN][pieceLastN+turn] === (turn*-1) || boardArray[pieceFirstN][pieceLastN+turn] === (turn*-2))){
    boardArray[pieceFirstN][pieceLastN+turn] = null;
    pieceCount();
    updateBoard();
    // even last num jumping right
  }
}

function jumpPieceOdd(){
  if (targetFirstN === pieceFirstN-1 && (boardArray[pieceFirstN][pieceLastN+turn] === (turn*-1) || boardArray[pieceFirstN][pieceLastN+turn] === (turn*-2))){
    boardArray[pieceFirstN][pieceLastN+turn] = null;
    pieceCount();
    updateBoard();
    // odd last num jumping left
  }
  if (targetFirstN === pieceFirstN+1 && (boardArray[targetFirstN][targetLastN-turn] === (turn*-1) || boardArray[targetFirstN][targetLastN-turn] === (turn*-2))){
    boardArray[targetFirstN][targetLastN-turn] = null;
    pieceCount();
    updateBoard();
    // odd last num jumping right
  }
}

function jumpKingEven(){
  if (targetFirstN === pieceFirstN-1 && (boardArray[targetFirstN][targetLastN+turn] === (turn*-1) || boardArray[targetFirstN][targetLastN+turn] === (turn*-2))){
    boardArray[targetFirstN][targetLastN+turn] = null;
    pieceCount();
    updateBoard();
    // king even jump down left
  }
  if (targetFirstN === pieceFirstN+1 && (boardArray[pieceFirstN][pieceLastN-turn] === (turn*-1) || boardArray[pieceFirstN][pieceLastN-turn] === (turn*-2))){
    boardArray[pieceFirstN][pieceLastN-turn] = null;
    pieceCount();
    updateBoard();
    // king even jump down right
  }
}

function jumpKingOdd(){
  if (targetFirstN === pieceFirstN-1 && (boardArray[pieceFirstN][pieceLastN-turn] === (turn*-1) || boardArray[pieceFirstN][pieceLastN-turn] === (turn*-2))){
    boardArray[pieceFirstN][pieceLastN-turn] = null;
    pieceCount();
    updateBoard();
    // king odd jump down left
  }
  if (targetFirstN === pieceFirstN+1 && (boardArray[targetFirstN][targetLastN+turn] === (turn*-1) || boardArray[pieceFirstN][pieceLastN+turn] === (turn*-2))){
    boardArray[targetFirstN][targetLastN+turn] = null;
    pieceCount();
    updateBoard();
    // king odd jump down right
  }
}

function pieceCount(){
  if (turn === 1){
    p2Pieces++
  }
  if (turn === -1){
    p1Pieces--
  }
  console.log(p1Pieces, 'p1 pieces', p2Pieces, 'p2 pieces')
  // possibly simplify by both values equal positive 12. maybe
}

function getWinner(){
  if (p1Pieces === 0){
    winner = -1
    displayName2.style.color = 'gold'
    displayName1.style.color = ''
  } else if (p2Pieces === 0){
    winner = 1
    displayName1.style.color = 'gold'
    displayName2.style.color = ''
  }
  // ^^ move the style changes later
  // console.log('winner is ', winner)
}

/**
 * checking for jump to force it
 * if turn is player 1 (1)
 * iterate through the board array with for each (array, index)
 * then use map to create new nested arrays 
 * the new nested array will be of the rows instead of columns like the orig.
 * 
 * 
 */
// console.log(sqInplay)
// console.log(boardArray)

function checkJump(){
  boardArray.forEach((array, i) => {
    array.forEach((elem, idx) => {
      if (elem === turn){
        if (i === 0){
          if (array[idx+turn] === turn*-1 && (idx % 2 === 0)){
            console.log('test check jump i = 0', idx, 'idx', i, 'i', elem, 'elem')  
            // i think it works. this checks if the piece at array 0 is even so that it can jump to the right. for both directions and doesnt read anything to its left.
            if (boardArray[i+1][idx+turn*2] === null){
              console.log('you can jump', i+1, 'i + 1', idx+turn*2, 'idx + turn*2')
              document.getElementById(`${i+1}${idx+turn*2}`).classList.toggle('jumpable')
            }
          }
        } else if (i === 3){

        } else {
          // if (array[idx+turn] === turn*-1){ // checks if value in the same array is the opposing piece
          //   console.log('test check jump')
          // }
        }
      }
    })
  })
}

// boardArray = [
//   [1, 1, 1, null, null, -1, -1, -1],  // array 0
//   [1, 1, 1, null, null, -1, -1, -1],  // array 1
//   [1, 1, 1, null, null, -1, -1, -1],  // array 2
//   [1, 1, 1, null, null, -1, -1, -1]   // array 3
// ]