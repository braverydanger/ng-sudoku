/**
 * Welcome to the main gulpfile. I hope you enjoy your stay.
 */
var gulp = require('gulp'),
    notify = require('gulp-notify'),
    fs = require('fs'),
    path = require("path"),
    argv = require('yargs').argv;

/*
 * Require external tasks
 * we do this by defining an array of directories containing gulptasks,
 * and grabbing all .js files from them.
 */
var onlyScripts = function(name) {
    return /(\.(js)$)/i.test(path.extname(name));
};
//var taskDirs = ['app', 'js', 'css'];
var taskDirs = ['app', 'js', 'css'];
for (var i = 0; i < taskDirs.length; i++) {
    var taskDir = './' + taskDirs[i] + '/gulptasks/';
    console.log('\n\nLooking for tasks in: ' + taskDir);
    if (fs.existsSync(taskDir)) {
        var tasks = fs.readdirSync(taskDir).filter(onlyScripts);
        tasks.forEach(function(task) {
            console.log('\tLoading task file: ' + taskDir + task);
        	require(taskDir + task);
        });
    };
};

// Set up a simple task to use as a dependency for other tasks to be seen as defaults
gulp.task('is-default-task', function(){
    return true;
});

//Start putting together the default task list
var defaultTaskList = (function() {
    var excluders = argv.excludeTasks
        && argv.excludeTasks.split(',').length
        && argv.excludeTasks.split(',').map(Function.prototype.call, String.prototype.trim);
    var includers = argv.includeTasks
        && argv.includeTasks.split(',').length
        && argv.includeTasks.split(',').map(Function.prototype.call, String.prototype.trim);
    if (excluders) {
        console.log("\n\nExcluded tasks:");
        console.log(excluders);
    };
    return (function() {
        var taskArr = [];
        for (task in gulp.tasks) {
            if (
                gulp.tasks.hasOwnProperty(task)
                && gulp.tasks[task].dep.indexOf('is-default-task') > -1
                && (!excluders || excluders.indexOf(gulp.tasks[task].name) < 0)
                && (!includers || includers.indexOf(gulp.tasks[task].name) > -1)
            ) {
                taskArr.push(gulp.tasks[task].name);
            };
        }
        return taskArr;
    }());
}());

console.log("\n\nThese are the default tasks running:");
console.log(defaultTaskList);

// Assign Default Gulp task
gulp.task('default', defaultTaskList, function() {
    return gulp.src('').pipe(notify({ message: 'Gulp default tasks have run.'}));
});
