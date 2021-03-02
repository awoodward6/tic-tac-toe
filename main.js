/*----- constants -----*/
const win = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

const playerStatus = {
    '0': "lightblue",
    '1': 'purple',
    '-1': 'orange',
};

/*----- app's state (variables) -----*/
let board, turn, winner; 

/*----- cached element references -----*/
const shell = document.getElementById('board');
const msgEl = document.getElementById('message'); 
const restartGame = document.getElementById('reset'); 

console.log(shell);
/*----- event listeners -----*/
shell.addEventListener('click', handleClick);
restartGame.addEventListener('click', init); //Replay button to reset full game

/*----- functions -----*/
init()

function init() {
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    turn = 1;
    winner = null;
    render();
}

function render() {
    //Render the board
    board.forEach(function(square, idx) {
        document.getElementById(idx).style.backgroundColor = playerStatus[square];

    });
    restartGame.style.display = 'none';
    if (winner === 'T') {
        msgEl.textContent = "Tie! Try again.";
        restartGame.style.display = 'block'; //s
    } else if (winner) {
        msgEl.textContent = `${playerStatus[winner].toUpperCase()} wins!`;
        restartGame.style.display = 'block';
    } else {
        msgEl.textContent = `${playerStatus[turn].toUpperCase()}'s turn.`; 
    }
}

function getWinner() {
    win.forEach(function(scenario) {
        if (Math.abs(board[scenario[0]] + board[scenario[1]] + board[scenario[2]]) === 3) {
            winner = turn;
        }  
    })
         if (!winner && !board.includes(0)){
         winner = "T";
    }
}

function handleClick(evt) {
  if (board[evt.target.id]) return;
  if (winner) return;
  board[evt.target.id] = turn; 
  console.log(board)
    getWinner();
    turn = turn * -1;
    render();
}
