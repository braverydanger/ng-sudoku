/*********************************
**	Module: gameboard
*********************************/


;(function(window, document, undefined) {
'use strict';

(function(window, document, undefined) {

angular
    .module(
        'sudoku.gameboard',
        ['ngRoute', 'ngResource']
    )


})(window, document);


(function(window, document, undefined) {

angular
    .module('sudoku.gameboard')
    .controller('sudoku.gameboard.mainCtrl', gameboardCtrl);


gameboardCtrl.$inject = [
    '$scope',
    '$timeout',
    'gameboardCreator',
    'gameboardActions'
];

function gameboardCtrl(
    $scope,
    $timeout,
    gameboardCreator,
    gameboardActions
) {

    /*
     * set vars
     */
    var vm = this; // View Model
    var board = gameboardCreator.makeBoard();


    /*
     * set view model attachments
     */
    vm.fullBoard = board.gameboard;
    vm.standardSlot = gameboardCreator.standardSlot;
    vm.boardData = {
        current : false,
        slotSetterVal : null,
        checkRows : board.checkers.rows,
        availableChoices : {}
    };

    /*
     * set $scope attachments
     */
    $scope.gameboardActions = gameboardActions;

    return vm;
}


})(window, document);


(function(window, document, undefined) {

angular
    .module('sudoku.gameboard')
    .directive('highlightSlots', highlightSlots);


/*
 * Directive for highlighting the rows and columns on hover
 */

function highlightSlots() {
    var highlightClass = "highlight";
    var selectedClass = "selected-value"

    var highlightRowsCols = function(isMouseover, boardData) {
        var elementList = document.querySelectorAll('td.row-' + boardData.row +', td.col-' + boardData.col);
        angular.forEach(elementList, function(val) {
            angular.element(val)[isMouseover ? "addClass" : "removeClass"]("highlight");
        })
        return false;
    };

    var selectAllSameValues = function(slot, isAlreadySelected, fullBoard) {
        var currentlySelected = document.querySelectorAll('td.' + selectedClass);
        var elementList = document.querySelectorAll('td.value-' + slot.slotValue);
        angular.forEach(currentlySelected, function(elem) {
            angular.element(elem).removeClass(selectedClass);
        });
        if (!isAlreadySelected) {
            angular.forEach(elementList, function(elem) {
                if (fullBoard[slot.slotValue].showValue){
                    angular.element(elem).addClass(selectedClass);
                };
            });
        }

    };

    return {
        scope : {
            boardData : '=highlightSlots'
        },
        link : function(scope, elem, attrs) {
            elem
                .bind('mouseover', function() {
                    highlightRowsCols(true, scope.boardData.slot);
                    return false;
                })
                .bind('mouseout', function() {
                    highlightRowsCols(false, scope.boardData.slot);
                    return false;
                })
                .bind('click', function() {
                    document.getElementById("hiddenValueInput").focus();
                });
            return false;
        }
    }
}


})(window, document);


(function(window, document, undefined) {

angular
    .module('sudoku.gameboard')
    .factory('gameboardActions', gameboardActions);


gameboardActions.$inject = ['$timeout'];

function gameboardActions($timeout) {

    var _self = {};

    _self.selectSlot = function(slotData, fullBoard, boardData) {
        console.log(boardData);
        var wasSelected = slotData.selected;
        for (var i = 0; i < fullBoard.length; i++) {
            fullBoard[i].selected =
                (
                    slotData.showValue
                    && fullBoard[i].showValue
                    && (fullBoard[i].slotValue === slotData.slotValue)
                )
                && !fullBoard[i].selected;
        };

        slotData.selected = !wasSelected && !slotData.showValue ? true : slotData.selected;
        boardData.current = slotData.selected && slotData.master > -1 && fullBoard[slotData.master];

        return false;
    };


    _self.setSlot = function(slotValue, fullBoard, boardData) {
        if (boardData.current) {
            if (boardData.current.showValue) {
                console.log("there's already a number there, doofus.")
            } else {
                if (slotValue === boardData.current.slotValue) {
                    fullBoard[boardData.current.master].showValue = true;
                    fullBoard[boardData.current.master].selected = false;
                    boardData.current = false;
                    // now show some kind of success message!
                } else {
                    _self.showError(fullBoard[boardData.current.master], boardData)
                    console.log("wrong number, guy.")
                }
            }
        } else {
            var slotData = {
                selected : false,
                slotValue : slotValue,
                showValue : true,
                master : null
            };
            _self.selectSlot(slotData, fullBoard, boardData);
        }

        return false;
    };

    _self.textSetSlot = function(fullBoard, boardData) {
        boardData.slotSetterVal = parseInt(boardData.slotSetterVal);
        if (boardData.slotSetterVal) {
            _self.setSlot(boardData.slotSetterVal, fullBoard, boardData);
        }
        boardData.slotSetterVal = null;
    }

    _self.showError = function(slot, boardData) {
        slot.hasError = true;
        $timeout(function() {
            slot.hasError = false;
        }, 1000)
    }

    return _self;
};


})(window, document);


(function(window, document, undefined) {

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


})(window, document);


(function(window, document, undefined) {

angular
    .module('sudoku.gameboard')
    .factory('gameboardHelpers', gameboardHelpers);


function gameboardHelpers() {

    var _self = {};

    _self.uniqueVals = function(a) {
        var seen = {};
        return a.filter(function(item) {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }

    return _self;
};


})(window, document);

})(window, document);
