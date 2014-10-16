/* packageConfig
 * Provides information about angular packages
 */
module.exports = {
    main : {
        moduleName : "sudoku.main.package",
        templateDir : "global",
        childModules : [
            'gameboard'
        ],
        additionalScripts : [
            'ui-scripts'
        ]
    }
};
