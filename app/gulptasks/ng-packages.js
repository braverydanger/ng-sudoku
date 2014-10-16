/* ng-packages
 * Takes agroup of angular modules and scripts and packages them into an app.
 */

var gulp = require('gulp'),
    concat = require('gulp-concat-util'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    Q = require("q"),
    gulpif = require('gulp-if'),
    changed = require("gulp-changed"),
    argv = require('yargs').argv;

var appPackages = require('./packageConfig');


var modulesDir = "app/src/modules/";
var packagesDir = "app/src/packages/";
var rawScriptsDir = "app/src/scripts/";
var concatModuleName = ".module.pack.js";
var destDir = './app/dest/';

var isDev = argv.hasOwnProperty('dev') && argv.dev;
var isProd = !argv.hasOwnProperty('dev') || !argv.dev;
var watchOnly = argv.hasOwnProperty('watchOnly') && argv.watchOnly;

/**********************************************************
 *
 * Task declarations
 *
 *********************************************************/

gulp.task(
    'ng-app-package',
    ['is-default-task'],
    gatherPackage
);


/**********************************************************
 *
 * Gulping functions
 *
 *********************************************************/

function packageTask(filename) {
    var promises = [];
    var pathParts = filename
        && filename.split(modulesDir).length
        && filename.split(modulesDir)[filename.split(modulesDir).length - 1].split("/");
    var passedModule = pathParts && pathParts.length && pathParts[0];

    for (var module in appPackages) {
        var defer = Q.defer();
        var mod = appPackages[module];

        if (!passedModule || (passedModule && mod.childModules.indexOf(passedModule) > -1)) {
            var srcFiles = mod.childModules.slice(0); // copy the childModules array
            // grab all module packs listed in the config
            for (var i = 0; i < srcFiles.length; i++) {
                srcFiles[i] = modulesDir
                    + srcFiles[i]
                    + "/"
                    + srcFiles[i]
                    + concatModuleName;
            };
            // add the top package module
            srcFiles.push(packagesDir + module + ".app.js");

            for (var i = 0; i < mod.additionalScripts.length; i++) {
                srcFiles.push(rawScriptsDir + mod.additionalScripts[i] + ".js");
            }
            var pipeline = gulp.src(srcFiles)
                .pipe(concat(module + ".app.js"))
                .pipe(gulpif(!isDev, uglify()))
                .pipe(notify("Package '" + module + ".app.js' compiled"))
                .pipe(gulp.dest(destDir));

            pipeline.on('end', function(){
                srcFiles = []; //empty out the srcFiles array
                defer.resolve();
            })
            promises.push(defer.promise)
        }
    };

    return Q.all(promises);
};

function gatherPackage() {
    gulp.watch(['app/src/packages/**/*.app.js', 'app/src/scripts/**/*.js'])
        .on('change', function(file) {
            packageTask(false);
        });

    // return early if flags are set to not run this task
    if (argv.waitForModules) {
        return false;
    };

    gulp.watch(['app/src/modules/**/*.pack.js'])
        .on('change', function(file) {
            packageTask(file.path);
        });
    return !watchOnly && packageTask(false);
};


/**********************************************************
 *
 * Return any exports
 *
 *********************************************************/

module.exports = {
    gatherPackage : packageTask
};
