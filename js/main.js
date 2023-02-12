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
    turn(square.target.id, huPlayer)
}

function turn(squareId, player) {
    let gameWon = checkWin(origBoard, player)

    origBoard[squareId] = player
    document.getElementById(squareId).innerText = player

    if(gameWon) {
        gameOver(gameWon)
    }
}

function checkWin(board, player) {

}

// function turn(squareId, player) {
//     origBoard[squareId] = player
//     const square = document.getElementById(squareId)
//     square.innerText = player
//     const attributeValue = square.getAttribute("cellIndex");
// }
