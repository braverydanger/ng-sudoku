/*
 * ng-templatecaches
 * Compiles angular view files into a given module's config
 */
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'),
    glob = require('glob'),
    Q = require('q'),
    templateCache = require('gulp-angular-templatecache'),
    argv = require('yargs').argv;

var appPackages = require('./packageConfig');
var srcDir = 'app/templates/';
var destBase = 'app/dest/templateCaches/';


var isProd = !argv.hasOwnProperty('dev') || !argv.dev;
var watchOnly = argv.hasOwnProperty('watchOnly') && argv.watchOnly;



/**********************************************************
 *
 * Task declarations
 *
 *********************************************************/
gulp.task(
    'ng-template-caches',
    ['is-default-task'],
    runTemplateCaches
);


/**********************************************************
 *
 * Main gulp functions
 *
 *********************************************************/
function runTemplateCaches() {
    var mainTask = function(filepath) {
        var pathParts = filepath
            && filepath.split(srcDir).length
            && filepath.split(srcDir)[filepath.split(srcDir).length - 1].split("/");
        var passedModule = pathParts && pathParts.length && pathParts[0];
        var promises = [];
        var componentsFolders = glob.sync(srcDir + (passedModule || '*') + '/');

        for (var module in appPackages) {
            if (!passedModule || (passedModule && (passedModule === module))) {
                var defer = Q.defer();
                var options = {
                    module : appPackages[module].moduleName,
                    base : function(file) {
                        var srcPath = file.path.split(srcDir);
                        return '/' + srcDir + srcPath[srcPath.length - 1];
                    }
                }
                var pipeline = gulp.src([
                        srcDir + appPackages[module].templateDir +'/**/*.html'
                    ])
                    .pipe(templateCache(module + '.templateCache.js', options))
                    .pipe(uglify())
                    .pipe(notify("TemplateCache "+ module +" complete"))
                    .pipe(gulp.dest(destBase));

                pipeline.on('end', function(){
                    defer.resolve();
                })
                promises.push(defer.promise)
            }
        };

        return Q.all(promises);
    };

    gulp.watch([srcDir + '**/*.html'])
        .on('change', function(file) {
            console.log("template caches about to be fired.");
            mainTask(file.path);
        });
    return !watchOnly && mainTask(false);
};
