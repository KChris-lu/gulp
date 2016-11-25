var config      = require('../config')
if(!config.tasks.js) return;

var gulp        = require('gulp'),
	changed     = require('gulp-changed'),
	gulpif      = require('gulp-if'),
    uglify      = require("gulp-uglify"),
    rename      = require('gulp-rename'),
	handleErrors= require('../lib/handleErrors'),
	taskPaths	= require('../lib/taskPaths');

var taskPath = taskPaths('', 'js');

gulp.task('minify-js', function () {
	gulp.src([taskPath.src, '*!README.md'])
		.pipe(rename({suffix: '.min'}))
		.pipe(changed(taskPath.dest))
		.pipe(gulpif(global.production, uglify()))
		.on('error', handleErrors)
		.pipe(gulp.dest(taskPath.dest))
});
