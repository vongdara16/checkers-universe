/*-------------------------------- Constants --------------------------------*/



/*---------------------------- Variables (state) ----------------------------*/
let turn, winner, boardArray

let pieceId, pieceFirstN, pieceLastN, targetId, targetFirstN, targetLastN

let chosenTheme

let p1Pieces, p2Pieces

let pieceClass

let name1, name2

/*------------------------ Cached Element References ------------------------*/
const gameTitle = document.querySelector('#game-title')
const background = document.querySelector('.background')
const winMsg = document.querySelector('#win-msg')

const playerName1 = document.querySelector('#input-player1')
const playerName2 = document.querySelector('#input-player2')
const theme = document.querySelector('.dropdown-menu')
const dropDownBtn = document.querySelector('#dropdownMenuButton2')
const playBtn = document.querySelector('#play-btn')
const startScreen = document.querySelector('#start-screen')

const startMenuBtn = document.querySelector('#start-menu-btn')
const resetBtn = document.querySelector('#reset-btn')
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
firstScreenLoadUp()
function firstScreenLoadUp(){
  startScreen.classList.add('animate__fadeInDown')
  playScreen.setAttribute('hidden', true)
  playScreen.classList.add('animate__fadeOutDown')
}

function screenSwap(){
  startScreen.classList.toggle('animate__fadeInDown')
  startScreen.classList.toggle('animate__fadeOutUp')
  background.classList.toggle(`${chosenTheme}`)
  setTimeout(() => {
    startScreen.toggleAttribute('hidden')
    playScreen.toggleAttribute('hidden')
  }, 500)
  playScreen.classList.toggle('animate__fadeOutDown')
  playScreen.classList.toggle('animate__fadeInUp')
}

function selectTheme(evt){
  dropDownBtn.innerHTML = evt.target.innerHTML
  chosenTheme = evt.target.innerHTML.toLowerCase()
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
  p1Pieces = 12
  p2Pieces = -12
  render();
  resetPieceInfo();
  resetHighlight();
  resetJumpable();
  winMsg.setAttribute('hidden', true)
}

function resetPieceInfo(){
  pieceClass = null
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
    name1 = 'Player 1'
  } else{
    displayName1.innerHTML = playerName1.value
    name1 = playerName1.value
  }
  if (playerName2.value === ''){
    displayName2.innerHTML = 'Player 2'
    name2 = 'Player 2'
  } else{
    displayName2.innerHTML = playerName2.value
    name2 = playerName2.value
  }

  sqInplay.forEach((elem) => {
    let num = elem.id
    let firstN = Number(num[0])
    let lastN = Number(num[1])
    if (boardArray[firstN][lastN] === 1){
      elem.innerHTML = `<div class="one-piece ${chosenTheme}" id="${firstN}${lastN}"></div>`
    }
    if (boardArray[firstN][lastN] === -1){
      elem.innerHTML = `<div class="two-piece ${chosenTheme}" id="${firstN}${lastN}"></div>`
    }
    if (boardArray[firstN][lastN] === 2){
      elem.innerHTML = `<div class="one-king ${chosenTheme}" id="${firstN}${lastN}"></div>`
    }
    if (boardArray[firstN][lastN] === -2){
      elem.innerHTML = `<div class="two-king ${chosenTheme}" id="${firstN}${lastN}"></div>`
    }
    if (boardArray[firstN][lastN] === null){
      elem.innerHTML = ``
    }
  })

  if (turn === 1){  
    displayName1.innerHTML = `${name1} - It's Your Turn!`
    displayName1.style.color = 'red'
    displayName2.innerHTML = name2
    displayName2.style.color = ''
  } else {
    displayName1.innerHTML = name1
    displayName1.style.color = ''
    displayName2.style.color = 'blue'
    displayName2.innerHTML = `${name2} - It's Your Turn!`
  }

  highlightJump();
  getWinner();
}

function getWinner(){
  if (p1Pieces === 0){
    winner = -1
    winMsg.toggleAttribute('hidden')
    winMsg.innerHTML = `${name2} WON!`
    displayName2.style.color = '#E0A800'
    displayName1.style.color = ''
    confetti.start(2000)
    return
  } else if (p2Pieces === 0){
    winner = 1
    winMsg.toggleAttribute('hidden')
    winMsg.innerHTML = `${name1} WON!`
    displayName1.style.color = '#E0A800'
    displayName2.style.color = ''
    confetti.start(2000);
    return
  }
}

function playerMove(evt){
  if (winner === null){
    if (turn === 1){
      if (evt.target.classList.contains('one-piece') || evt.target.classList.contains('one-king') ){
        getPiece(evt);
        resetHighlight();
        evt.target.parentElement.classList.add('highlight1')
      }
    } else {
      if (evt.target.classList.contains('two-piece') || evt.target.classList.contains('two-king')){
        getPiece(evt);
        resetHighlight();
        evt.target.parentElement.classList.add('highlight-1')
      }
    }
    if (evt.target.classList.contains('inplay') && pieceId !== null){
      getTarget(evt);
      resetHighlight();
      movePiece();
    }
  }
}

function getPiece(evt){
  pieceClass = evt.target.className
  pieceId = evt.target.id
  pieceFirstN = Number(pieceId[0])
  pieceLastN = Number(pieceId[1])
  console.log(pieceClass)
}

function getTarget(evt){
  targetId = evt.target.id
  targetFirstN = Number(targetId[0])
  targetLastN = Number(targetId[1])
}

function resetHighlight(){
  sqInplay.forEach((elem) =>{
    elem.classList.remove('highlight1')
    elem.classList.remove('highlight-1')
  })
}

function resetJumpable(){
  sqInplay.forEach((elem) =>{
    elem.classList.remove(`jumpable1`)
    elem.classList.remove(`jumpable-1`)
  })
}

function movePiece(){
  if (pieceClass.includes('one-king') || pieceClass.includes('two-king')){
    if (pieceLastN % 2 === 0){
      if (moveKingCond(-1)){
        updateBoard();
      } else if (jumpKingCond()){
        jumpKingEven();
      } else {
        resetPieceInfo();
      }
    }else {
      if (moveKingCond(1)){
        updateBoard();
      } else if (jumpKingCond()){
        jumpKingOdd();
      } else {
        resetPieceInfo();
      }
    }
  } else {
    if (pieceLastN % 2 === 0){
      if (moveCond(-1)){
        updateBoard();
      } else if (jumpCond()){
        jumpPieceEven();
      } else {
        resetPieceInfo();
      }
    }else {
      if (moveCond(1)){
        updateBoard();
      } else if (jumpCond()){
        jumpPieceOdd();
      } else {
        resetPieceInfo();
      }
    }
  }
}

function updateBoard(){
  if (boardArray[pieceFirstN][pieceLastN] === turn*2){
    boardArray[targetFirstN][targetLastN] = turn*2;
    boardArray[pieceFirstN][pieceLastN] = null;
    turn *= -1;
    resetJumpable();
    render();
    resetPieceInfo();
  } else {
    boardArray[targetFirstN][targetLastN] = turn;
    boardArray[pieceFirstN][pieceLastN] = null;
    turn *= -1;
    kingMe();
    resetJumpable();
    render();
    resetPieceInfo();
  }
}

function kingMe(){
  boardArray.forEach((array, i) => {
    array.forEach((elem, idx) => {
      if (elem === 1 && idx === 7){
        boardArray[i][idx] = 2
      }
      if (elem === -1 && idx === 0){
        boardArray[i][idx] = -2
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
    return true
  } else {
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
    return true
  } else {
    return false
  }
}

function jumpPieceEven(){
  if (targetFirstN === pieceFirstN-1 && (boardArray[targetFirstN][targetLastN-turn] === (turn*-1) || boardArray[targetFirstN][targetLastN-turn] === (turn*-2))){
    boardArray[targetFirstN][targetLastN-turn] = null;
    pieceCount();
    updateBoard();
    return
    // even last num jumping left
  }
  if (targetFirstN === pieceFirstN+1 && (boardArray[pieceFirstN][pieceLastN+turn] === (turn*-1) || boardArray[pieceFirstN][pieceLastN+turn] === (turn*-2))){
    boardArray[pieceFirstN][pieceLastN+turn] = null;
    pieceCount();
    updateBoard();
    return
    // even last num jumping right
  }
}

function jumpPieceOdd(){
  if (targetFirstN === pieceFirstN-1 && (boardArray[pieceFirstN][pieceLastN+turn] === (turn*-1) || boardArray[pieceFirstN][pieceLastN+turn] === (turn*-2))){
    boardArray[pieceFirstN][pieceLastN+turn] = null;
    pieceCount();
    updateBoard();
    return
    // odd last num jumping left
  }

  if (targetFirstN === pieceFirstN+1 && (boardArray[targetFirstN][targetLastN-turn] === (turn*-1) || boardArray[targetFirstN][targetLastN-turn] === (turn*-2))){
    boardArray[targetFirstN][targetLastN-turn] = null;
    pieceCount();
    updateBoard();
    return
    // odd last num jumping right
  }
}

function jumpKingEven(){
  if (targetLastN > pieceLastN){
    if ((boardArray[pieceFirstN][pieceLastN+1] === turn*-1 || boardArray[pieceFirstN][pieceLastN+1] === turn*-2) && (targetFirstN === pieceFirstN+1)){
      boardArray[pieceFirstN][pieceLastN+1] = null
      pieceCount();
      updateBoard();
      return  // king even jump up right
    } 
    
    if ((boardArray[targetFirstN][targetLastN-1] === turn*-1 || boardArray[targetFirstN][targetLastN-1] === turn*-2) && (targetFirstN === pieceFirstN-1)){
      boardArray[targetFirstN][targetLastN-1] = null
      pieceCount();
      updateBoard();
      return  // king even jump up left
    }
  } else{
    if ((boardArray[pieceFirstN][pieceLastN-1] === turn*-1 || boardArray[pieceFirstN][pieceLastN-1] === turn*-2) && (targetFirstN === pieceFirstN+1)){
      boardArray[pieceFirstN][pieceLastN-1] = null
      console.log(pieceId, 'pieceID', targetId, 'targetID')
      pieceCount();
      updateBoard();
      return  // king even jump down right
    } 
    
    if ((boardArray[targetFirstN][targetLastN+1] === turn*-1 || boardArray[targetFirstN][targetFirstN+1] === turn*-2) && (targetFirstN === pieceFirstN-1)){
      boardArray[targetFirstN][targetLastN+1] = null
      pieceCount();
      updateBoard();
      return  // king even jump down left
    }
  }
}

function jumpKingOdd(){
  if (targetLastN > pieceLastN){
    if ((boardArray[targetFirstN][targetLastN-1] === turn*-1 || boardArray[targetFirstN][targetLastN-1] === turn*-2) && (targetFirstN === pieceFirstN+1)){
      boardArray[targetFirstN][targetLastN-1] = null
      pieceCount();
      updateBoard();
      return  // king odd jump up right
    }

    if ((boardArray[pieceFirstN][pieceLastN+1] === turn*-1 || boardArray[pieceFirstN][pieceLastN+1] === turn*-2) && (targetFirstN === pieceFirstN-1)){
      boardArray[pieceFirstN][pieceLastN+1] = null
      pieceCount();
      updateBoard();
      return  // king odd jump up left
    }
  } else {
    if ((boardArray[targetFirstN][targetLastN+1] === turn*-1 || boardArray[targetFirstN][targetLastN+1] === turn*-2) && (targetFirstN === pieceFirstN+1)){
      boardArray[targetFirstN][targetLastN+1] = null
      pieceCount();
      updateBoard();
      return  // king odd jump down right
    }

    if ((boardArray[pieceFirstN][pieceLastN-1] === turn*-1 || boardArray[pieceFirstN][pieceLastN-1] === turn*-2) && (targetFirstN === pieceFirstN -1)){
      boardArray[pieceFirstN][pieceLastN-1] = null
      pieceCount();
      updateBoard();
      return  // king odd jump down left
    }
  }
  
}

function pieceCount(){
  if (turn === 1){
    p2Pieces++
  }
  if (turn === -1){
    p1Pieces--
  }
}

function highlightJump(){
  boardArray.forEach((array, i) => {
    array.forEach((elem, idx) => {
      if (elem === turn || elem === turn*2){
        if (i === 0){
          if (idx % 2 === 0){
            hLightEvenJumpR(array, i, idx);
            kingEvenJumpBackR(array, i, elem, idx);
          } else {
            hLightOddJumpR(i, idx);
            kingOddJumpBackR(i, elem, idx);
          }
        } else if (i === 3){
          if (idx % 2 === 0){
            hLightEvenJumpL(i, idx);
            kingEvenJumpBackL(i, elem, idx);
          } else {
            hLightOddJumpL(array, i, idx);
            kingOddJumpBackL(array, i, elem, idx);
          }
        } else {
          if (idx % 2 === 0){
            hLightEvenJumpL(i, idx);
            hLightEvenJumpR(array, i, idx);
            kingEvenJumpBackL(i, elem, idx);
            kingEvenJumpBackR(array, i, elem, idx);
          } else {
            hLightOddJumpL(array, i, idx);
            hLightOddJumpR(i, idx);
            kingOddJumpBackL(array, i, elem, idx);
            kingOddJumpBackR(i, elem, idx);
          }
        }
      }
    })
  })
}

function hLightEvenJumpR(array, i, idx){
  if (array[idx+turn] === turn*-1 || array[idx+turn] === turn*-2){
    if (boardArray[i+1][idx+turn*2] === null){
      document.getElementById(`${i+1}${idx+turn*2}`).classList.add(`jumpable${turn}`)
      // if even and space empty highlight jump right
    }
  }
}

function hLightEvenJumpL(i, idx){
  if (boardArray[i-1][idx+turn] === turn*-1  || boardArray[i-1][idx+turn] === turn*-2){
    if (boardArray[i-1][idx+turn*2] === null){
      document.getElementById(`${i-1}${idx+turn*2}`).classList.add(`jumpable${turn}`)
      // if even and space empty highlight jump left
    }
  }
}

function hLightOddJumpR(i, idx){
  if (boardArray[i+1][idx+turn] === turn*-1 || boardArray[i+1][idx+turn] === turn*-2){
    if (boardArray[i+1][idx+turn*2] === null){
      document.getElementById(`${i+1}${idx+turn*2}`).classList.add(`jumpable${turn}`)
      // if odd and space empty highlight jump right
    }
  }
}

function hLightOddJumpL(array, i, idx){
  if (array[idx+turn] === turn*-1  || array[idx+turn] === turn*-2){
    if (boardArray[i-1][idx+turn*2] === null){
      document.getElementById(`${i-1}${idx+turn*2}`).classList.add(`jumpable${turn}`)
      // if odd and space empty highlight jump left
    }
  }
}

function kingEvenJumpBackR(array, i, elem, idx){
  if (elem === turn*2){
    if (array[idx-turn] === turn*-1 || array[idx-turn] === turn*-2){
      if (boardArray[i+1][idx-turn*2] === null){
        document.getElementById(`${i+1}${idx-turn*2}`).classList.add(`jumpable${turn}`)
        // if king even jump back right highlight
      }
    }
  }
}

function kingEvenJumpBackL(i, elem, idx){
  if (elem === turn*2){
    if (boardArray[i-1][idx-turn] === turn*-1 || boardArray[i-1][idx-turn] === turn*-2){
      if (boardArray[i-1][idx-turn*2] === null){
        document.getElementById(`${i-1}${idx-turn*2}`).classList.add(`jumpable${turn}`)
        // if king even jump back left highlight
      }
    }
  }
}

function kingOddJumpBackR(i, elem, idx){
  if (elem === turn*2){
    if (boardArray[i+1][idx-turn] === turn*-1 || boardArray[i+1][idx-turn] === turn*-2){
      if (boardArray[i+1][idx-turn*2] === null){
        document.getElementById(`${i+1}${idx-turn*2}`).classList.add(`jumpable${turn}`)
        // if king odd jump back right highlight
      }
    }
  }
}

function kingOddJumpBackL(array, i, elem, idx){
  if (elem === turn*2){
    if (array[idx-turn] === turn*-1 || array[idx-turn] === turn*-2){
      if (boardArray[i-1][idx-turn*2] === null){
        document.getElementById(`${i-1}${idx-turn*2}`).classList.add(`jumpable${turn}`)
        // if king odd jump back left highlight
      }
    }
  }
}