const gameBoard = (() => {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const getGameBoard = () => board;
    const placeMarker = (row, col, symbol) => {
        if (board[row][col] === '') {
            board[row][col] = symbol;
            return true;
        } else {
            return false;
        }
    };

    const resetGameBoard = () => {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                board[i][j] = '';
            }
        }
    };

    return {
        getGameBoard,
        placeMarker,
        resetGameBoard
    }

})();

function createPlayer(name, symbol) {
    let score = 0;

    const getScore = () => score;
    const increaseScore = () => { score++ };
    const resetScore = () => score = 0;

    return {
        name,
        getScore,
        symbol,
        increaseScore,
        resetScore
    };
};

/*
const player1 = createPlayer('Rafael', 'X');
const player2 = createPlayer('Ana', 'O');
const game = gameController(player1, player2);
*/

function gameController(player1, player2) {

    const players = [player1, player2];

    let currentPlayer = players[0];

    const switchTurn = () => {
        if (currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    };

    const winner = () => {

        const board = gameBoard.getGameBoard();

        let cellOne = board[0][0];
        let cellTwo = board[0][1];
        let cellThree = board[0][2];
        let cellFour = board[1][0];
        let cellFive = board[1][1];
        let cellSix = board[1][2];
        let cellSeven = board[2][0];
        let cellEight = board[2][1];
        let cellNine = board[2][2];

        // win by rows
        if (cellOne != '' && cellOne === cellTwo && cellTwo === cellThree) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        if (cellFour != '' && cellFour === cellFive && cellFive === cellSix) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        if (cellSeven != '' && cellSeven === cellEight && cellEight === cellNine) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        // win by columns 
        if (cellOne != '' && cellOne === cellFour && cellFour === cellSeven) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        if (cellTwo != '' && cellTwo === cellFive && cellFive === cellEight) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        if (cellThree != '' && cellThree === cellSix && cellSix === cellNine) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        // win by cross
        if (cellOne != '' && cellOne === cellFive && cellFive === cellNine) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        if (cellThree != '' && cellThree === cellFive && cellFive === cellSeven) {
            console.log(gameBoard.getGameBoard());
            console.log(`${getCurrentPlayer().name} winner`);
            getCurrentPlayer().increaseScore();
            console.log(getCurrentPlayer().getScore());
            return true
        };

        return false;
    };

    const tie = () => {
        const hasEmptyCells = gameBoard.getGameBoard().some(row => row.some(element => element === ''));
        if (hasEmptyCells != true) {
            console.log('This is a tied')
        };
    }

    const getCurrentPlayer = () => currentPlayer;

    let gameOver = false;
    let roundOver = false;

    const getRoundOver = () => roundOver;
    const getGameOver = () => gameOver;

    const resetGameOver = () => gameOver = false;
    const resetRoundOver = () => roundOver = false;

    const playRound = (row, col) => {
        if (gameOver === false) {
            if (roundOver === false) {
                console.log(`${getCurrentPlayer().name} is your turn`);
                console.log(gameBoard.getGameBoard());
                let validMovement = gameBoard.placeMarker(row, col, getCurrentPlayer().symbol);
                if (validMovement === true) {
                    const hasWinner = winner();
                    if (hasWinner === false) {
                        switchTurn();
                        tie();
                    }
                    if (hasWinner == true) {
                        let gameHasWinner = gameWinner();
                        if (gameHasWinner === true) {
                            console.log('Game Over');
                            gameOver = true;
                        } else {
                            switchTurn();
                            roundOver = true;
                        }
                    }
                }
                else {
                    console.log('Try again')
                }
            }
        }

    }

    const gameWinner = () => {
        const playerScore = getCurrentPlayer().getScore();
        if (playerScore === 3) {
            return true
        } else {
            return false
        }
    }


    const newRound = () => {
        if (gameOver === false) {
            gameBoard.resetGameBoard();
            roundOver = false;
        }
    };

    return {
        playRound,
        getCurrentPlayer,
        newRound,
        getGameOver,
        resetGameOver,
        resetRoundOver
    };
}


function domController() {

    const board = document.getElementById('boardContainer');

    const renderBoard = () => {


        for (let i = 0; i < gameBoard.getGameBoard().length; i++) {       // Itera sobre las filas
            for (let j = 0; j < gameBoard.getGameBoard()[i].length; j++) {  // Itera sobre las columnas
                const newCell = document.createElement('div');
                newCell.classList.add('cell');
                newCell.textContent = gameBoard.getGameBoard()[i][j];
                newCell.dataset.row = i;
                newCell.dataset.columns = j;
                newCell.addEventListener('click', function () {
                    if (game.getGameOver()) {
                        return;
                    }
                    board.innerHTML = '';
                    game.playRound(i, j);
                    renderBoard();
                });
                board.appendChild(newCell);
            }
        }

    };

    const btnReset = document.getElementById('nextRound');
    btnReset.addEventListener('click', () => {
        game.newRound();
        board.innerHTML = '';
        renderBoard();
    });

    const btnNewGame = document.getElementById('resetGame');
    btnNewGame.addEventListener('click', () => {
        gameBoard.resetGameBoard();
        game.resetGameOver();
        game.resetRoundOver();
        player1.resetScore();
        player2.resetScore();
        board.innerHTML = '';
        renderBoard();
    });

    const btnNames = document.getElementById('showModal');
    const btnSave = document.getElementById('save');
    const input1 = document.getElementById('playerName1')
    const input2 = document.getElementById('playerName2');
    const meModal = document.getElementById('modal');
    const btnClose = document.getElementById('close-modal');

    btnNames.addEventListener('click', () => {
        meModal.classList.add('show');
        input1.value = '';
        input2.value = '';
    });

    btnClose.addEventListener('click', () => {
        meModal.classList.remove('show');
    });

    btnSave.addEventListener('click', () => {
        const name1 = input1.value;
        const name2 = input2.value;

        player1 = createPlayer(name1, 'X');
        player2 = createPlayer(name2, 'O');

        game = gameController(player1, player2);

        board.innerHTML = '';
        gameBoard.resetGameBoard();
        renderBoard();

        meModal.classList.remove('show');

    });

    return {
        renderBoard
    };
};

let player1 = createPlayer('Player 1', 'X');
let player2 = createPlayer('Player 2', 'O');

let game = gameController(player1, player2);

const dom = domController();
dom.renderBoard();
