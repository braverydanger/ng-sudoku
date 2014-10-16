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
