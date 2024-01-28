"use strict";

let side = 50;
let board = [];
let intervalId = null;

function createBoard() {
    for (let i = 0; i < side; i++) {
        let row = [];
        $("#board").append($("<div>").addClass("line"));
        for (let j = 0; j < side; j++) {
            row.push(false);
            $("#board").children()
                .last()
                .append($("<div>").addClass("cell").attr("id", `cell_${i}_${j}`));
        }
        board.push(row);
    }
}

function giveLife() {
    let [i, j] = this.id.split('_').slice(1).map(Number);
    board[i][j] = !board[i][j];
    $(this).toggleClass("alive");
}

function startGame() {
    if (!intervalId) {
        intervalId = setInterval(update, 500);
    }
}

function pauseGame() {
    clearInterval(intervalId);
    intervalId = null;
}

function update() {
    let newBoard = board.map(row => [...row]);

    for (let i = 0; i < side; i++) {
        for (let j = 0; j < side; j++) {
            let nbLives = countLife(i, j);

            if (nbLives < 2 || nbLives > 3) {
                newBoard[i][j] = false;
                $(`#cell_${i}_${j}`).removeClass("alive");
            }
            if (nbLives === 3) {
                newBoard[i][j] = true;
                $(`#cell_${i}_${j}`).addClass("alive");
            }
        }
    }

    board = newBoard;
}

function countLife(i, j) {
    let count = 0;

    let up = i - 1;
    if (up < 0) {
        up = side - 1;
    }
    let left = j - 1;
    if (left < 0) {
        left = side - 1;
    }
    let down = i + 1;
    if (down > side - 1) {
        down = 0;
    }
    let right = j + 1;
    if (right > side - 1) {
        right = 0;
    }

    if (board[up][left]) {
        count++;
    }
    if (board[i][left]) {
        count++;
    }
    if (board[down][left]) {
        count++;
    }
    if (board[up][right]) {
        count++;
    }
    if (board[i][right]) {
        count++;
    }
    if (board[down][right]) {
        count++;
    }
    if (board[up][j]) {
        count++;
    }
    if (board[down][j]) {
        count++;
    }

    return count;
}

$(() => {
    createBoard();
    $(".cell").click(giveLife)
    $("#start").click(startGame)
    $("#pause").click(pauseGame)
});