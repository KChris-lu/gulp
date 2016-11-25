var config      = require('../config')
if(!config.tasks.html) return;

var gulp 			= require('gulp'),
	minifyHtml 		= require("gulp-minify-html"),
	nunjucksRender 	= require('gulp-nunjucks-render'),
	data 			= require('gulp-data'),
	gulpif 			= require('gulp-if'),
	path 			= require('path'),
	fs 				= require('fs'),
	handleErrors	= require('../lib/handleErrors'),
	taskPaths		= require('../lib/taskPaths');

var taskPath = taskPaths('', 'html');

var getData = function(file) {
	var dataPath = path.resolve(config.root.src, '', config.tasks.html.dataFile)
	return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

gulp.task('minify-html', function () {

	gulp.src([taskPath.src, '*!README.md'])
		.pipe(gulpif(global.production, minifyHtml(config.tasks.html.htmlmin)))
		.pipe(gulp.dest(taskPath.dest));

	gulp.src(path.join(config.root.src, 'index.html'))
		.pipe(data(getData))
		.pipe(nunjucksRender({
			path: [taskPath.src],
			envOptions: {
				watch: false,
				tags: {
					variableStart: '{$',
					variableEnd: '}',
				}
			}
		}))
		.on('error', handleErrors)
		.pipe(gulpif(global.production, minifyHtml(config.tasks.html.htmlmin)))
		.pipe(gulp.dest('./'));
});
