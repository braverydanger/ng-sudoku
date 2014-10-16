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
