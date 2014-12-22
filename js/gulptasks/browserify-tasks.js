/*
 * ng-vendors
 * Compiles a defined list of vendor scripts
 */

var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    browserify  = require('gulp-browserify'),
    rename      = require('gulp-rename'),
    argv        = require('yargs').argv;

var isProd = !argv.hasOwnProperty('dev') || !argv.dev;
var watchOnly = argv.hasOwnProperty('watchOnly') && argv.watchOnly;


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


// gulp.task(
//     'ng-vendors',
//     ['is-default-task'],
//     runVendorScripts
// );

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
        console.log("here");
        return gulp.src('./js/src/*.js')
            .pipe(browserify())
            .pipe(gulp.dest('./js/dest'))
    };

    gulp.watch(['js/src/**/*.js']).on('change', mainTask);
    return !watchOnly && mainTask();
};
