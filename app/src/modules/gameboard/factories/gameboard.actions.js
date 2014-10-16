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
