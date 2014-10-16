var gulp = require('gulp'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    clean = require('gulp-clean'),
    livereload = require('gulp-livereload'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    templateCache = require('gulp-angular-templatecache');


function makeModules() {
    return gulp.src([
        'app/src/modules/config/*.js',
        'app/src/modules/helpers/*.js',
        'app/src/modules/productDetail/*.js'
    ])
    .pipe(concat('quickviewModules.js'))
    .pipe(gulp.dest('app/dest/dev/js/'));
}

function makeModuleScripts() {
    return gulp.src([
        'app/src/modules/config/**/*.js',
        'app/src/modules/helpers/**/*.js',
        'app/src/modules/productDetail/**/*.js'
    ])
    .pipe(concat('quickviewModuleScripts.js'))
    .pipe(gulp.dest('app/dest/dev/js/'));
}

function makePackage(locale) {
    return gulp.src([
            "app/src/packages/productDetail.quickview.app.js",
            "app/src/scripts/*.js",
            'app/locales/' + locale + '/config.js',
            'app/locales/' + locale + '/angular-locale.js',
            'app/dest/dev/js/quickviewModules.js',
            'app/dest/dev/js/quickviewModuleScripts.js',
            'app/locales/' + locale + '/templates/templateCaches/quickviewTemplates.js',
            'app/src/pdp_bootstrap.js'
        ])
        .pipe(concat('pdp_quickview.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/locales/'+locale+'/packages/'))
        .pipe(notify(locale + " quickview package compiled."));
};

function gatherTemplates(locale) {
    var options = {
        module : 'productDetailQuickview',
        root : '/'+locale+'/app/templates/'
    }
    gulp.src([
            'app/templates/productdetail/**/*.html',
            'app/templates/productdetail/*/*.html'
        ])
        .pipe(templateCache('quickviewTemplates.js', options))
        .pipe(gulp.dest('app/locales/'+locale+'/templates/templateCaches/'))
        .pipe(notify("The quickview templateCache '"+ locale +"' is complete"));
}

gulp.task('ng-quickview-package', function() {
    var locales = [
        'urban'//,
        // 'uk',
        // 'fr',
        // 'de'
    ];
    makeModules();
    makeModuleScripts();
    for (var i = 0; i < locales.length; i++) {
        gatherTemplates(locales[i]);
        makePackage(locales[i]);
    }
});
