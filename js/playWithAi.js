let origBoard
const humanPlayer = 'O'
const aiPlayer = 'X'

const cells = document.querySelectorAll('.cell')

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

initializeGame()

function initializeGame() {
    document.querySelector('.endgame').style.display = 'none'
    origBoard = Array.from(Array(9).keys())

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = ''
        cells[i].style.removeProperty('background-color')
        cells[i].addEventListener('click', turnTakingLogic, false)
    }
}

function turnTakingLogic(square) {

    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, humanPlayer)
        if (!checkTie()) {
            turn(bestSpot(), aiPlayer)
        }
    }

}

function turn(squareId, player) {

    origBoard[squareId] = player
    document.getElementById(squareId).innerText = player

    let gameWon = checkWin(origBoard, player)

    if (gameWon) {
        gameOver(gameWon)
    }
}

function checkWin(board, player) {
    let plays = board.reduce((a, e, i) => (e === player) ? a.concat(i) : a, [])
    let gameWon = null
    for (let [index, win] of winConditions.entries()) {
        if (win.every(elem => plays.indexOf(elem) > -1)) {
            gameWon = { index: index, player: player }

            break
        }
    }
    return gameWon
}

function gameOver(gameWon) {
    for (let index of winConditions[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player === humanPlayer ? "green" : "red";
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnTakingLogic, false);
    }

    declareWinner(gameWon.player == humanPlayer ? 'You win' : 'You lose')
}

function bestSpot() {
    return minimaxAlgorithm(origBoard, aiPlayer).index
}

function emptySquare() {
    return origBoard.filter(s => typeof s == 'number')
}

function checkTie() {

    if (emptySquare().length == 0) {
        for (let i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = 'blue'
            cells[i].removeEventListener('click', turnTakingLogic, false)
        }

        declareWinner("Its a Draw")
        return true
    }

    return false
}

function declareWinner(who) {
    document.querySelector('.endgame').style.display = 'block'
    document.querySelector('.endgame .text').innerText = who
}

function minimaxAlgorithm(newBoard, player) {
    let availableSpots = emptySquare(newBoard);

    if (checkWin(newBoard, humanPlayer)) {
        return { score: -10 }
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 }
    } else if (availableSpots.length === 0) {
        return { score: 0 }
    }

    let moves = [];
    for (let i = 0; i < availableSpots.length; i++) {
        let move = {}
        move.index = newBoard[availableSpots[i]]
        newBoard[availableSpots[i]] = player

        if (player === aiPlayer)
            move.score = minimaxAlgorithm(newBoard, humanPlayer).score
        else
            move.score = minimaxAlgorithm(newBoard, aiPlayer).score
        newBoard[availableSpots[i]] = move.index
        if ((player === aiPlayer && move.score === 10) || (player === humanPlayer && move.score === -10))
            return move
        else
            moves.push(move)
    }

    let bestMove, bestScore

    if (player === aiPlayer) {
        bestScore = -1000
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score
                bestMove = i
            }
        }
    } else {
        bestScore = 1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score
                bestMove = i
            }
        }
    }

    return moves[bestMove]
}
