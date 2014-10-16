/*
 * ng-vendors
 * Compiles a defined list of vendor scripts
 */

var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    argv = require('yargs').argv;

var isProd = !argv.hasOwnProperty('dev') || !argv.dev;
var watchOnly = argv.hasOwnProperty('watchOnly') && argv.watchOnly;

var scriptBasePath = 'app/src/vendor/';
var ngVersion = '1.2.9';

var vendorScriptList = [
        'angular',
        'angular.resource',
        'angular.route'
    ].map(function(val){
    return scriptBasePath + val + '.' + ngVersion + '.js';
});


/**********************************************************
 *
 * Task declarations
 *
 *********************************************************/

gulp.task(
    'ng-vendors',
    ['is-default-task'],
    runVendorScripts
);

/**********************************************************
 *
 * Main gulp functions
 *
 *********************************************************/

/****************************************
 * Compile all of the vendor scripts
 ***************************************/
function runVendorScripts() {
    var mainTask = function() {
        return gulp.src(vendorScriptList)
            .pipe(concat('vendorScripts.js'))
            .pipe(uglify())
            .pipe(gulp.dest('app/dest/'));
    };

    gulp.watch(['app/src/vendor/**/*.js']).on('change', mainTask);
    return !watchOnly && mainTask();
};
