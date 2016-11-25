var config = require('../config')
if(!config.tasks.images) return

var gulp        = require('gulp'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	changed     = require('gulp-changed'),
	handleErrors= require('../lib/handleErrors'),
	taskPaths	= require('../lib/taskPaths');

var taskPath = taskPaths('', 'images');

gulp.task('minify-images', function () {
	gulp.src([taskPath.src, '*!README.md'])
		.pipe(changed(taskPath.dest))
		/*.pipe(imagemin({
			progressive: true,
			use: [pngquant()]
		}))*/
		.on('error', handleErrors)
		.pipe(gulp.dest(taskPath.dest));
});
