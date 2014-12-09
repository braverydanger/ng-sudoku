/**
 * Welcome to the Jobblescrips gulpfile. Do you mind if I finish my soup?
 * requirejs and regular ol' js tasks
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'), // keeping this here just in case
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    changed = require('gulp-changed'),
    gulpif = require('gulp-if'),
    path = require('path'),
    argv = require('yargs').argv;

var isProd = !argv.hasOwnProperty('dev') || !argv.dev;
var watchOnly = argv.hasOwnProperty('watchOnly') && argv.watchOnly;

/**********************************************************
 *
 * Task declarations
 *
 *********************************************************/

gulp.task(
    'clean-js',
    [],
    cleanJs
);

gulp.task(
    'build-require-app',
    ['clean-js', 'is-default-task'],
    buildRequireApp
);

gulp.task(
    'build-app-js',
    ['clean-js', 'is-default-task'],
    buildAppJs
);

gulp.task(
    'build-lib-js',
    ['clean-js', 'is-default-task'],
    buildLibJs
);

/**********************************************************
 *
 *
 * Main gulp functions
 *
 *
 *********************************************************/



/****************************************
 * Clean on up
 ***************************************/
function cleanJs()  {
    return gulp.src('build/js')
        pipe(clean());
}


/****************************************
 * Build the require app
 ***************************************/
function buildRequireApp() {
    var mainTask = function() {
        return gulp.src(['js/app.js', 'js/app/main.js'])
            .pipe(rename({suffix: '.min'}))
            .pipe(gulpif(isProd, uglify()))
            .pipe(gulp.dest('build/js'))
            .pipe(notify({
                message: 'requirejs files created'
            }))
    };
    gulp.watch(['js/app.js', 'js/app/main.js']).on('change', mainTask);
    return !watchOnly && mainTask();
};


/****************************************
 * Build the app script
 ***************************************/
function buildAppJs() {
    var srcDir = 'js/app/';
    var src = srcDir + '**/*.js';
    var dest = 'build/js';
    var mainTask = function(filename, sendNotification) {
        //console.log(filename);
        //console.log(filename.split(srcDir)[filename.split(srcDir).length - 1]);
        filename = filename && filename.split(srcDir)[filename.split(srcDir).length - 1];
        var subDir = filename && filename.split(path.basename(filename));
        var srcFile = (filename && srcDir + filename) || src;
        var destDir = (subDir && !!subDir.length && dest + '/' + subDir[0]) || dest;
        return gulp.src(srcFile)
            //.pipe(concat('common.min.js'))
            .pipe(gulpif(isProd, uglify()))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(destDir))
            .pipe(gulpif(sendNotification, notify({
                message: 'JS app file processed: ' + filename
            })));
    };
    gulp.watch(['js/app/**/*.js'])
        .on('change', function(file) {
            mainTask(file.path, true);
        });
    return !watchOnly && mainTask(false, false);
};


/****************************************
 * Build the js lib
 ***************************************/
function buildLibJs() {
    var srcDir = 'js/lib/';
    var src = srcDir + '*.js';
    var dest = 'build/js';
    var mainTask = function(filename, sendNotification) {
        filename = filename && path.basename(filename);
        var srcFile = (filename && srcDir + path.basename(filename)) || src;
        return gulp.src(srcFile)
            .pipe(gulpif(isProd, uglify()))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(dest))
            .pipe(gulpif(sendNotification, notify({
                message: 'JS lib file processed: ' + filename
            })));
    };
    gulp.watch(['js/lib/*.js'])
        .on('change', function(file) {
            mainTask(file.path, true);
        });
    return !watchOnly && mainTask(false, false);
};
