var Slot = require('./slot')

module.exports = (function(){
    var emptyCheckers = function(gridRow) {
        var checkers = {
            rows : [],
            cols : [],
            grid : []
        };
        for (var i = 0; i < gridRow; i++) {
            checkers.rows[i] = [];
            checkers.cols[i] = [];
            checkers.grid[i] = [];
        };
        return checkers;
    };

    var standardRow = function(root){
        var retObj = {};
        for (var i = 0; i < root.gridRow; i++) {
            retObj[i+1] = 0;
        };
        return retObj;
    }

    var assignBoardValues = function(root) {
        var retBoard = [];
        root.emptyCheckers();
        for (var i = 0; i < root.fullGrid; i++) {
            var s = new Slot(root, i);
            if (!s) { return false; }
            s.parentGrid = root;
            s.row = Math.floor(i/root.gridRow);
            s.col = Math.floor(i-(s.row*root.gridRow));
            s.grid = Math.floor(s.col/(root.gridBase))
                + (
                    Math.floor(s.row/(root.gridBase))
                    * root.gridBase
                );

            var pVal = s.possibleValues(
                    root.gridCheckers,
                    root.standardRow
                );
            // If no possible values, return false early
            if (!pVal) { return false; }

            s.val = pVal;
            s.showValue = (function(){
                    var dif = root.difficulty;
                    var rando = (Math.floor(Math.random()*100))
                    return rando > ((dif < 11 ? dif : 10)*5 + 25);
                })();
            root.gridCheckers.rows[s.row].push(s.val);
            root.gridCheckers.cols[s.col].push(s.val);
            root.gridCheckers.grid[s.grid].push(s.val);
            retBoard.push(s);
        };
        root.boardIsReady = true;
        return retBoard;
    };

    var masterGrid = function(gridBase, difficulty) {
        this.boardIsReady = false;
        this.difficulty = difficulty || 3;
        this.gridBase = gridBase || 3;
        this.gridRow = Math.pow(this.gridBase, 2);
        this.fullGrid = Math.pow(this.gridRow, 2);
        this.selectedSlot = false;
        this.gridCheckers = new emptyCheckers(this.gridRow);
        this.errorCount = 0;
        this.gameOver = false;
        this.standardRow = new standardRow(this);
        this.board = (function(root){
            var retBoard = false;
            var tooMany = 0;
            do {
                retBoard = assignBoardValues(root);
                tooMany++;
            } while (!root.boardIsReady && tooMany < 2500);

            if (!retBoard) {
                console.log("it's just too many. Refresh, buddy.")
            }
            return retBoard;
        })(this);
    };

    masterGrid.prototype = {
        constructor : masterGrid,
        emptyCheckers : function(){
            this.gridCheckers = new emptyCheckers(this.gridRow);
        },
        setSelectedSlot : function(slotId) {
            this.selectedSlot = !isNaN(slotId) && this.board[slotId];
            this.countShowingSlots();
        },
        countShowingSlots : function() {
            var slotCount = 0;
            this.standardRow = new standardRow(this);
            for (var i = 0; i < this.board.length; i++) {
                this.board[i].showValue && slotCount++;
                if (this.board[i].showValue) {
                    this.standardRow.hasOwnProperty(this.board[i].val)
                    && this.standardRow[this.board[i].val]++;
                }
            };
            (this.fullGrid === (slotCount)) && this.gameComplete();
            return slotCount;
        },
        gameComplete : function() {
            alert("You did it!!")
        }
    };

    return masterGrid;
})();
