const board = document.getElementById('board');
const statusText = document.getElementById('status');
const resultScreen = document.getElementById('resultScreen');
const resultMessage = document.getElementById('resultMessage');

let currentPlayer = 'X';
let gameActive = true;
let gameState = Array(9).fill('');

const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function createBoard() {
  board.innerHTML = '';
  gameState = Array(9).fill('');
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  resultScreen.classList.add('hidden');

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleCellClick);
    board.appendChild(cell);
  }
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    showResult(`Player ${currentPlayer} wins!`);
    gameActive = false;
  } else if (!gameState.includes('')) {
    showResult("It's a draw!");
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  return winningCombos.some(combo => {
    const [a, b, c] = combo;
    return gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c];
  });
}

function showResult(message) {
  resultMessage.textContent = message;
  resultScreen.classList.remove('hidden');
}

function resetGame() {
  createBoard();
}

createBoard();
