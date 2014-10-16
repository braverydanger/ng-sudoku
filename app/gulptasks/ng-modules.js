/**
 * ng-modules
 * This script packages angular modules into 'pack' files
 */


var gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    gulpif = require('gulp-if'),
    glob = require('glob'),
    fs = require('fs'),
    Q = require("q"),
    changed = require("gulp-changed"),
    argv = require('yargs').argv;

var ng_packages = argv.waitForModules && require('./ng-packages.js');

var isProd = !argv.hasOwnProperty('dev') || !argv.dev;
var watchOnly = argv.hasOwnProperty('watchOnly') && argv.watchOnly;

/**********************************************************
 *
 * Task declarations
 *
 *********************************************************/
gulp.task(
    'ng-module-packs',
    ['is-default-task'],
    runModulePack
);

/**********************************************************
 *
 * Main gulp functions
 *
 *********************************************************/

/****************************************
 * Main task for gathering and
 * packing angular modules
 ***************************************/

function runModulePack() {
    var srcDir = 'app/src/modules/';
    var mainTask = function(filename, sendNotification) {
        var pathParts = filename
            && filename.split(srcDir).length
            && filename.split(srcDir)[filename.split(srcDir).length - 1].split("/");
        var passedModule = pathParts && pathParts.length && pathParts[0];
        var promises = [];
        var componentsFolders = glob.sync(srcDir + (passedModule || '*') + '/');

        componentsFolders.forEach(function(filePath){
            if (fs.statSync(filePath).isDirectory()) {
                var defer = Q.defer();
                var componentName = filePath.match(/.+\/(.+)\/$/)[1];
                var packTitle = '/*********************************\n'
                    + '**\tModule: ' + componentName + '\n'
                    + '*********************************/\n\n'
                var pipeline = gulp.src([filePath + '**/*.js', '!' + filePath + '*.module.pack.js'])
                    .pipe(
                        concat(
                            componentName + '.module.pack.js',
                            {
                                process: function(src) {
                                    var retSrc = '\n(function(window, document, undefined) {\n\n'
                                        + (src + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1')
                                        + '\n})(window, document);\n';
                                    return retSrc;
                                }
                            }
                        )
                    )
                    .pipe(
                        concat.header(packTitle + '\n;(function(window, document, undefined) {\n\'use strict\';\n')
                    )
                    .pipe(
                        concat.footer('\n})(window, document);\n')
                    )
                    .pipe(
                        gulpif(
                            sendNotification, notify("Module '" + componentName + ".module.pack.js' compiled")
                        )
                    )
                    .pipe(
                        gulp.dest(filePath)
                    );
                    
                pipeline.on('end', function() {
                    defer.resolve();
                });
                promises.push(defer.promise);
            }
        });

        return Q.all(promises).then(function(){
            // if we are waiting for all modules to initially finish,
            // then set up the package task!
            !sendNotification && console.log("Modules compiled");
            if (argv.waitForModules) {
                return ng_packages && ng_packages.gatherPackage(filename);
            }
        });
    };

    gulp.watch(['app/src/modules/**/*.js', '!app/src/modules/**/*.pack.js'])
        .on('change', function(file) {
            mainTask(file.path, true);
        });
    return !watchOnly && mainTask(false, false);
};
