var config      = require('../config')
if(!config.tasks.css) return;

var gulp        = require('gulp'),
	less        = require('gulp-less'),
	sourcemaps  = require('gulp-sourcemaps'),
	minifyCss   = require('gulp-minify-css'),
	rename      = require('gulp-rename'),
	changed     = require('gulp-changed'),
	autoprefixer= require('gulp-autoprefixer'),
	merge       = require('merge-stream'),
	gulpif      = require('gulp-if'),
	handleErrors= require('../lib/handleErrors'),
	taskPaths	= require('../lib/taskPaths');

var lessPath = taskPaths('', ['css', 'less']);
var cssPath = taskPaths('', ['css', true]);

gulp.task('minify-css', function () {
	gulp.src([lessPath.src, cssPath.src, '*!README.md'])
		.pipe(gulpif(!global.production, sourcemaps.init()))
		.pipe(less())
		.pipe(autoprefixer(config.tasks.css.autoprefixer))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulpif(global.production, minifyCss({
			keepSpecialComments: '*'
		})))
		.pipe(gulpif(!global.production, sourcemaps.write()))
		.on('error', handleErrors)
		.pipe(gulp.dest(lessPath.dest))
});
