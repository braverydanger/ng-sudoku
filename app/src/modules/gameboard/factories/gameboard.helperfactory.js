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
