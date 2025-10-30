const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const pvpBtn = document.getElementById('pvpBtn');
const cpuBtn = document.getElementById('cpuBtn');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;
let mode = 'pvp'; // 'pvp' ou 'cpu'

const winCombinations = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWin() {
  return winCombinations.some(combination => {
    const [a,b,c] = combination;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function checkDraw() {
  return board.every(cell => cell !== '');
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] || gameOver) return;
  
 
  if (mode === 'cpu' && currentPlayer !== 'X') return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `Jogador ${currentPlayer} venceu!`;
    gameOver = true;
  } else if (checkDraw()) {
    message.textContent = `Empate!`;
    gameOver = true;
  } else {
   
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `É a vez do jogador ${currentPlayer}`;

    
    if (mode === 'cpu' && currentPlayer === 'O') {
      setTimeout(cpuMove, 300);
    }
  }
}

function cpuMove() {
  if (gameOver) return;

  const emptyIndices = board.map((val, i) => val === '' ? i : null).filter(i => i !== null);
  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  board[randomIndex] = 'O';
  cells[randomIndex].textContent = 'O';

  if (checkWin()) {
    message.textContent = `Jogador O venceu!`;
    gameOver = true;
  } else if (checkDraw()) {
    message.textContent = `Empate!`;
    gameOver = true;
  } else {
    currentPlayer = 'X';
    message.textContent = `É a vez do jogador ${currentPlayer}`;
  }
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  gameOver = false;
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  message.textContent = `É a vez do jogador ${currentPlayer}`;
}

pvpBtn.addEventListener('click', () => {
  mode = 'pvp';
  restartGame();
});
cpuBtn.addEventListener('click', () => {
  mode = 'cpu';
  restartGame();
});

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartBtn.addEventListener('click', restartGame);

message.textContent = `É a vez do jogador ${currentPlayer}`;

