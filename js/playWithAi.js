let origBoard
const huPlayer = 'O'
const aiPlayer = 'X'

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

const cells = document.querySelectorAll('.cell')

initializeGame()

function initializeGame() {
    document.querySelector('.endgame').style.display = 'none'
    origBoard = Array.from(Array(9).keys())
    // console.log(origBoard)

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = ''
        cells[i].style.removeProperty('background-color')
        cells[i].addEventListener('click', turnTakingLogic, false)
    }
}

function turnTakingLogic(square) {

    if (typeof origBoard[square.target.id] == 'number') {
        turn(square.target.id, huPlayer)
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
            gameWon.player === huPlayer ? "green" : "red";
    }
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnTakingLogic, false);
    }

    declareWinner(gameWon.player == huPlayer ? 'You win' : 'You lose')
}

function bestSpot() {
    return emptySquare()[0]
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
// function turn(squareId, player) {
//     origBoard[squareId] = player
//     const square = document.getElementById(squareId)
//     square.innerText = player
//     const attributeValue = square.getAttribute("cellIndex");
// }
