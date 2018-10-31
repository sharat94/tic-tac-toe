/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 *
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 *
 * Winner has to be decided and has to be flashed
 *
 * Extra points will be given for the Creativity
 *
 * Use of Google is not encouraged
 *
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

const allEqualToX = arr => arr.every( v => v === 1 )
const allEqualToO = arr => arr.every( v => v === 2 )
function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';

    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    let newValue = 1;
    grid[colIdx][rowIdx] = newValue;
    renderMainGrid();
    playAsComputer();
    checkIfGameIsOver();
    addClickHandlers();
}

function checkIfGameIsOver() {
  checkRowWin();
  checkColumnWin();
//   checkDiagonalWin();
//   checkCrossDiagonalWin();
}
function checkRowWin() {
  var boxes = document.getElementsByClassName("box");
  for (var rowId = 0; rowId < GRID_LENGTH; rowId++) {
    var values = [];
    for (var columnId = 0; columnId < GRID_LENGTH; columnId ++){
      values.push(grid[rowId][columnId]);
    }
    var Xstatus = allEqualToX(values);
    var YStatus = allEqualToO(values);
    if (Xstatus || YStatus){
        window.alert('rows have won');
        setTimeout(function(){ location.reload(); }, 1000);
    }
  }
}
function checkColumnWin() {
  var boxes = document.getElementsByClassName("box");
  for (var columnId = 0; columnId < GRID_LENGTH; columnId ++) {
    var values = [];
    for (var rowId = 0; rowId < GRID_LENGTH; rowId++){
      values.push(grid[rowId][columnId]);
    }
    var Xstatus = allEqualToX(values);
    var YStatus = allEqualToO(values);
    if (Xstatus || YStatus){
        window.alert('columns have won');
        setTimeout(function(){ location.reload(); }, 1000);
    }
  }
}
function checkDiagonalWin() {
  var boxes = document.getElementsByClassName("box");
  for (var id = 0; id < GRID_LENGTH; id ++) {
    var values = [];
    values.push(grid[id][id]);
  }
    var Xstatus = allEqualToX(values);
    var YStatus = allEqualToO(values);
    if (Xstatus || YStatus){
        window.alert('diagonals have won');
        setTimeout(function(){ location.reload(); }, 1000);
    }
}
function checkCrossDiagonalWin() {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0, j= (GRID_LENGTH - 1); i < GRID_LENGTH; i ++, j--) {
    var values = [];
    values.push(grid[i][j]);
  }
    var Xstatus = allEqualToX(values);
    var YStatus = allEqualToO(values);
    if (Xstatus || YStatus){
        window.alert('diagonals have won');
        setTimeout(function(){ location.reload(); }, 1000);
    }
}
function playAsComputer() {
    renderMainGrid();
    counterWin();
    renderMainGrid();
}
function counterWin() {
    var rowAData = {};
    var columnData = {};
    let diagonalCount = 0;
    // Note: diagonal and cross diagonal logic is yet to be implemented
    for (var i = 0; i < GRID_LENGTH; i ++){
        for (var j = 0; j < GRID_LENGTH; j++){
            if (grid[i][j] == 1){
                if (rowAData[i] == undefined){
                    rowAData[i] = 0;
                }
                rowAData[i] += 1;
            }
        }
    }
    for (var j = 0; j < GRID_LENGTH; j++){
        for (var i = 0; i < GRID_LENGTH; i ++){
            if (grid[j][i] == 1){
                if (columnData[i] == undefined){
                    columnData[i] = 0;
                }
                columnData[i] += 1;
            }
        }
    }
    for (var i = 0; i < GRID_LENGTH; i ++){
        if (grid[i][i] == 1){
            diagonalCount += 1;
        }
    }
    for (var i = 0; i < GRID_LENGTH; i ++){
        if (rowAData[i] > 1){
            populateRow(i);
            return;
        }
    }
    for (var i = 0; i < GRID_LENGTH; i ++){
        if (columnData[i] > 1){
            populateColumn(i);
            return;
        }
    }
    for (var i = 0; i < GRID_LENGTH; i ++){
        if (diagonalCount[i] > 1){
            populateDiagonal();
            return;
        }
    }
        playRandom();
}
function playRandom() {
    var boxes = document.getElementsByClassName("box");
    for (var id = 0; id < boxes.length; id++) {
        if (boxes[id].children.length == 0){
          var rowId = boxes[id].getAttribute("rowIdx");
          var colId = boxes[id].getAttribute("colIdx");
          let newValue = 2;
          grid[colId][rowId] = newValue;
          return;
        }
    }
}
function populateRow(rowId) {
    for (var i = 0; i < GRID_LENGTH; i ++){
        if (grid[rowId][i] == 0){
            grid[rowId][i] = 2;
            return;
        }
    }
}
function populateColumn(columnId) {
    for (var i = 0; i < GRID_LENGTH; i ++){
        if (grid[i][columnId] == 0){
            grid[i][columnId] = 2;
            return;
        }
    }
}
function populateDiagonal(id) {
    for (var i = 0; i < GRID_LENGTH; i ++){
        if (grid[i][i] == 0){
            grid[i][i] = 2;
            return;
        }
    }
}
function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

initializeGrid();
renderMainGrid();
addClickHandlers();
