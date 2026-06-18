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
        } else {
            console.log('The cell is not empty');
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

console.log(gameBoard.getGameBoard());

function createPlayer(name, symbol) {
    let score = 0;

    const getScore = () => score;
    const increaseScore = () => { score++ };

    return {
        name,
        getScore,
        symbol,
        increaseScore
    };
}

const printNewRound = () => {
    gameBoard.getGameBoard();
    console.log
}

const player1 = createPlayer('Rafael', 'X');
const player2 = createPlayer('Ana', 'O');

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

    const playRound = (row, col) => {
        if (getCurrentPlayer().getScore() === 0) {
            console.log(`${getCurrentPlayer().name} is your turn`);
            console.log(gameBoard.getGameBoard());
            gameBoard.placeMarker(row, col, getCurrentPlayer().symbol);

            const hasWinner = winner();
            if (hasWinner === false) {
                tie();
            }
            switchTurn();
        } else {
            console.log('Game Over');
        }


    };

    playRound(0, 0);//rafa
    playRound(0, 1);//ana
    playRound(0, 2);//rafa
    playRound(1, 0);//ana
    playRound(1, 1);//rafa
    playRound(1, 2);//ana
    playRound(2, 1);//rafa
    playRound(2, 0);//ana
    playRound(2, 2);//rafa


    return {
        playRound,
        getCurrentPlayer
    };
}

gameController(player1, player2);