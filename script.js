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

function gameController(player1, player2) {

    const players = [player1, player2];

    let currentPlayer = players[0];

    const getScoreP1 = () => players[0].getScore();
    const getScoreP2 = () => players[1].getScore();

    const getNameP1 = () => players[0].name;
    const getNameP2 = () => players[1].name

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
            getCurrentPlayer().increaseScore();
            return true
        };

        if (cellFour != '' && cellFour === cellFive && cellFive === cellSix) {
            getCurrentPlayer().increaseScore();
            return true
        };

        if (cellSeven != '' && cellSeven === cellEight && cellEight === cellNine) {
            getCurrentPlayer().increaseScore();
            return true
        };

        // win by columns 
        if (cellOne != '' && cellOne === cellFour && cellFour === cellSeven) {
            getCurrentPlayer().increaseScore();
            return true
        };

        if (cellTwo != '' && cellTwo === cellFive && cellFive === cellEight) {
            getCurrentPlayer().increaseScore();
            return true
        };

        if (cellThree != '' && cellThree === cellSix && cellSix === cellNine) {
            getCurrentPlayer().increaseScore();
            return true
        };

        // win by cross
        if (cellOne != '' && cellOne === cellFive && cellFive === cellNine) {
            getCurrentPlayer().increaseScore();
            return true
        };

        if (cellThree != '' && cellThree === cellFive && cellFive === cellSeven) {
            getCurrentPlayer().increaseScore();
            return true
        };

        return false;
    };

    const tie = () => {
        const hasEmptyCells = gameBoard.getGameBoard().some(
            row => row.some(element => element === '')
        );

        return !hasEmptyCells;
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
                let validMovement = gameBoard.placeMarker(row, col, getCurrentPlayer().symbol);
                dom.messageTurn();
                const hasWinner = winner();
                if (validMovement === true) {
                    if (hasWinner === false) {
                        if (tie()) {
                            switchTurn();
                            dom.messageTie();
                            roundOver = true;
                        } else {
                            switchTurn();
                            dom.messageTurn();
                        }

                    }
                }
                if (hasWinner === true) {
                    let gameHasWinner = gameWinner();
                    if (gameHasWinner === true) {
                        dom.messageGameOver();
                        gameOver = true;
                    } else {
                        dom.messageWinner();
                        switchTurn();
                        roundOver = true;
                    }
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
        getRoundOver,
        resetGameOver,
        resetRoundOver,
        getScoreP1,
        getScoreP2,
        getNameP1,
        getNameP2,
    };

}





function domController() {

    const board = document.getElementById('boardContainer');
    const textInfo = document.getElementById('text-info')
    const scoreP1 = document.getElementById('score-one');
    const scoreP2 = document.getElementById('score-two');

    const renderBoard = () => {


        for (let i = 0; i < gameBoard.getGameBoard().length; i++) {
            for (let j = 0; j < gameBoard.getGameBoard()[i].length; j++) {
                const newCell = document.createElement('div');
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
                if (i === 0 && j <= 2) {
                    newCell.classList.add('row-one')
                }
                if (i === 1 && j <= 2) {
                    newCell.classList.add('row-two')
                }
                if (i <= 2 && j === 0) {
                    newCell.classList.add('column-one')
                }
                if (i <= 2 && j === 1) {
                    newCell.classList.add('column-two')
                }
                newCell.classList.add('cell')
                board.appendChild(newCell);
            }
        }

        showScoreP1();
        showScoreP2();
    };

    const btnReset = document.getElementById('nextRound');
    btnReset.addEventListener('click', () => {
        if (game.getGameOver()) {
            return;
        }
        game.newRound();
        board.innerHTML = '';
        renderBoard();
        messageTurn();
    });

    const btnNewGame = document.getElementById('resetGame');
    btnNewGame.addEventListener('click', () => {
        messageTurn();
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

        if (name1 === '' || name2 === '') {
        } else {
            player1 = createPlayer(name1, 'X');
            player2 = createPlayer(name2, 'O');
        }

        game = gameController(player1, player2);

        board.innerHTML = '';
        gameBoard.resetGameBoard();
        renderBoard();

        meModal.classList.remove('show');

        messageTurn();
    });
    const messageTie = () => {
        textInfo.textContent = 'Is a tie'
    }

    const messageTurn = () => {
        const turn = game.getCurrentPlayer().name;
        textInfo.textContent = `${turn} is your turn`;
    }

    const messageWinner = () => {
        const winner = game.getCurrentPlayer().name;
        textInfo.textContent = `${winner} win`;
    }

    const messageGameOver = () => {
        const playerGameWinner = game.getCurrentPlayer().name;
        textInfo.textContent = `Game Over, ${playerGameWinner} is the winner`;
    }

    const showScoreP1 = () => {
        const playerScore = game.getScoreP1();
        const name = game.getNameP1();
        scoreP1.textContent = `${name}\n\n${playerScore}`;
    }

    const showScoreP2 = () => {
        const playerScore = game.getScoreP2();
        const name = game.getNameP2();
        scoreP2.textContent = `${name}\n\n${playerScore}`;
    }

    return {
        renderBoard,
        messageTurn,
        messageWinner,
        messageGameOver,
        messageTie
    };
};

let player1 = createPlayer('Player 1', 'X');
let player2 = createPlayer('Player 2', 'O');

let game = gameController(player1, player2);

const dom = domController();
dom.renderBoard();
dom.messageTurn();
