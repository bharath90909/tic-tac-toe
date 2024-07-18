const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "0" },
];

const board = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let activePlayer = 0;
let playerId = null;
let roundCount = 0;

const startBtn = document.querySelector(".start-game-btn");

const editBtns = document.querySelectorAll(".edit-btn");

//active-playerr
const activePlayerName = document.querySelector(".active-player");

//display-winner

const displayWinner = document.querySelector(".display-winner");

//form
const input = document.querySelector(".input");
const errMsg = document.querySelector(".error-msg");
const cancelBtn = document.querySelector(".cancel-btn");
const submitBtn = document.querySelector(".submit-btn");

// back-drop and modal
const backDrop = document.querySelector(".back-drop");
const modal = document.querySelector(".modal");

//Game Board
const playingBoard = document.querySelector(".playing-board");
const gameBoard = document.querySelector(".game-board");

function startGame() {
  resetBoard();
  if (players[0].name === "" || players[1].name === "") {
     return alert("Enter Player Names")
  }
  activePlayerName.style.display = "block";
  playingBoard.style.display = "block";
  activePlayerName.firstElementChild.innerHTML = `It's your turn <span>${players[activePlayer].name}</span>`;
}

function editPlayerName(event) {
  playerId = event.target.dataset.playerid;
  console.log(playerId);
  backDrop.style.display = "block";
  modal.style.display = "block";
}

function formValidation(event) {
  event.preventDefault();

  if (input.value.trim().length === 0) {
    return (errMsg.style.display = "block");
  }
  let playerName = input.value;
  players[playerId - 1].name = playerName;
  document.querySelector(`.player-${playerId}-name`).innerText = playerName;

  modalClose();
}

function modalClose(event) {
  errMsg.style.display = "none";
  backDrop.style.display = "none";
  modal.style.display = "none";
  input.value = "";
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerName.firstElementChild.innerHTML = `It's your turn <span>${players[activePlayer].name}</span>`;
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] > 0 &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] > 0 &&
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i]
    )
      return board[0][i];
  }
  //checking top-bottom diaonal
  if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return board[0][0];
  }
  //checking bottom-top diagonal
  if (board[2][0] === board[1][1] && board[1][1] === board[0][2])
    return board[2][0];

  if (roundCount === 9) {
    return -1;
  }
  return 0;
}

function gameOver(winnerId) {
  if (winnerId > -1) {
    displayWinner.children[0].textContent = `You won,${
      players[winnerId - 1].name
    }`;
  } else {
    displayWinner.children[0].textContent = "Its a draw";
  }
  displayWinner.style.display = "block";
  activePlayerName.style.display = "block";
}

function resetBoard() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = 0;
    }
  }
  activePlayer = 0;
  roundCount = 0;
  playerId = null;
  const getDisabledCells = document.querySelectorAll(".disabled");
  getDisabledCells.forEach((cell) => {
    cell.classList.remove("disabled");
    cell.textContent = "";
  });
  displayWinner.style.display = "none";
  activePlayerName.style.display = "none";
}
function handleGameBoard(event) {
  const element = event.target;
  if (element.tagName !=="LI") {
    return ;
  }
    if (element.classList.contains("disabled")) {
      return alert("Please Choose Another Cell");
    }
    element.innerText = players[activePlayer].symbol;
    element.classList.add("disabled");
    const col = element.dataset.col;
    const row = element.dataset.row;
    board[row - 1][col - 1] = activePlayer + 1;
    console.log(board);
    switchPlayer();
    roundCount++;
    const winnerId = checkWinner();
    if (winnerId !== 0) {
      console.log(winnerId);
      gameOver(winnerId);
    }
  

}

startBtn.addEventListener("click", startGame);
cancelBtn.addEventListener("click", modalClose);
submitBtn.addEventListener("click", formValidation);
gameBoard.addEventListener("click", handleGameBoard);
backDrop.addEventListener("click", (event) => {
  if (event.target.classList.contains("back-drop")) {
    modalClose();
  }
});
editBtns.forEach((btn) => {
  btn.addEventListener("click", editPlayerName);
});
