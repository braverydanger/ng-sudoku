/**
 * Welcome to the CSS/sass gulpfile. Have a beer!
 * Compiles and compasses sass
 */
var gulp = require('gulp'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    compass = require('gulp-compass'),
    notify = require('gulp-notify'),
    minifycss = require('gulp-minify-css'),
    gulpif = require('gulp-if'),
    argv = require('yargs').argv;

// css tasks

var isProd = !argv.hasOwnProperty('dev') || !argv.dev;
var watchOnly = argv.hasOwnProperty('watchOnly') && argv.watchOnly;


/**********************************************************
 *
 * Task declarations
 *
 *********************************************************/

gulp.task(
    'clean-css',
    ['is-default-task'],
    cleanCss
);

gulp.task(
    'sass',
    ['clean-css', 'is-default-task'],
    getSassy
);

// gulp.task(
//     'move-css-files',
//     ['is-default-task'],
//     moveCssFiles
// );

gulp
    .watch(['build/**/*.css'])
    .on('change', function(file) {
        return !!file.path && gulp.src(file.path)
            .pipe(gulp.dest('banana'))
            .pipe(gulp.dest('apples'))
            .pipe(gulp.dest('crisps'))
            .pipe(notify({
                message: file.path
            }));
    });


/**********************************************************
 *
 * Gulping functions
 *
 *********************************************************/


/****************************************
 * Clean on up
 ***************************************/
function cleanCss(){
    return true;
    // return gulp.src('build/css/')
    //     .pipe(clean());
};

/****************************************
 * Main Sass function
 ***************************************/
function getSassy() {
    var mainTask = function() {
        return gulp.src('sass/src/main.scss')
            //.pipe(sass()) // use npm's default sass compiler; super fast!
            .pipe(compass({ // we need to use compass because of our foundation dependency
                config_file: 'config.rb', // tells compass to include singulary
                css: 'build/css', // destination directory for css files
                sass: 'sass' // source directory for sass files
            }))
            //.pipe(gulpif(isProd, minifycss()))
            //.pipe(gulp.dest('tests'))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('build'))
            //.pipe(livereload())
            .pipe(notify({
                message: 'Sass compiled!'
            }));

    };

    gulp.watch(['sass/src/*.scss', 'sass/src/**/*.scss'])//
        .on('change', function(file) {
            console.log(file.path);
            mainTask(file.path);
        });
    return !watchOnly && mainTask();
};


/****************************************
 * Move CSS files once saved
 ***************************************/
function moveCssFiles() {
    var mainTask = function(filePath) {

        return !!filePath && gulp.src(filePath)
            .pipe(gulp.dest('banana'))
            .pipe(gulp.dest('apples'))
            .pipe(gulp.dest('crisps'))
            .pipe(notify({
                message: filePath
            }));

    };

    gulp.watch(['build/**/*.css'])//
        .on('change', function(file) {
            console.log(file.path);
            mainTask(file.path);
        });
    return !watchOnly && mainTask();
};
