angular
    .module('sudoku.gameboard')
    .factory('gameboardCreator', gameboardCreator);


function gameboardCreator() {

    var _self = {};
    var checkers = {};
    var boardReady = false;

    var gridLength = 3
    var masterGrid = gridLength*gridLength;

    _self.standardSlot = [1,2,3,4,5,6,7,8,9];

    _self.emptyCheckers = function() {
        checkers = {
            rows : [],
            cols : [],
            grid : []
        };
        for (var i = 0; i < masterGrid; i++) {
            checkers.rows[i] = [];
            checkers.cols[i] = [];
            checkers.grid[i] = [];
        };
    }

    _self.possibleVals = function(x, y, gridSlot) {
        var retArray = [];
        for (var i = 0; i < masterGrid; i++) {
            if (
                checkers.rows[x].indexOf(_self.standardSlot[i]) < 0
                && checkers.cols[y].indexOf(_self.standardSlot[i]) < 0
                && checkers.grid[gridSlot].indexOf(_self.standardSlot[i]) < 0
            ) {
                retArray.push(_self.standardSlot[i]);
            }
        }
        return retArray;
    };

    _self.createMasterGrid = function() {
        var retBoard = [];
        _self.emptyCheckers();

        for (var i = 0; i < masterGrid; i++) {
            for (var ii = 0; ii < masterGrid; ii++) {
                var slotObj = {
                    master : ii + (i * masterGrid),
                    grid : Math.floor(i/3)*3 + Math.floor(ii/3),
                    row : i,
                    col : ii
                };
                retBoard.push(slotObj);
            };
        };
        return retBoard;
    };

    _self.assignBoardToRows = function(rows, gameboard) {
        var reducer = Math.floor(Math.sqrt(gameboard.length));
        for (var i = 0; i < gameboard.length; i++) {
            var singleRow = Math.floor(i/reducer);
            var singleCol = i - (singleRow * reducer);
            rows[singleRow][singleCol] = gameboard[i];
        }
        return rows;
    };

    _self.checkBoard = function() {
        var gameboard = _self.createMasterGrid();
        for (var i = 0; i < gameboard.length; i++) {
            var fb = gameboard[i];
            var pVals = _self.possibleVals(fb.row, fb.col, fb.grid);
            var rando = Math.floor(Math.random()*pVals.length);
            var slotVal = pVals[rando];
            if (!pVals.length) {
                return false;
            } else {
                checkers.rows[fb.row].push(slotVal);
                checkers.cols[fb.col].push(slotVal);
                checkers.grid[fb.grid].push(slotVal);
                fb.slotValue = slotVal;
                fb.showValue = false;
                fb.gridIndex = i;
                fb.selected = false;
                fb.hasError = false;
                fb.hasSuccess = false;
            }
        };
        boardReady = true;
        checkers.rows = _self.assignBoardToRows(checkers.rows, gameboard);
        return {
            gameboard : gameboard,
            checkers : checkers
        };
    };

    _self.makeBoard = function(callback) {
        var retBoard;
        do {
            retBoard = _self.checkBoard();
        } while (!boardReady);

        boardReady = false;
        retBoard.gameboard = _self.removeSlots(retBoard.gameboard);
        return retBoard;
    };

    _self.removeSlots = function(gameboard) {
        for (var i = 0; i < gameboard.length; i++) {
            var rando = Math.floor(Math.random()*2)/10;
            if (rando % i === 0) {
                gameboard[i].showValue = true;
            }
        };
        return gameboard;
    }

    return _self;
};
