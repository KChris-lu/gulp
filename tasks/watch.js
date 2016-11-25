var config      = require('../config')

var gulp        = require('gulp'),
	handleErrors= require('../lib/handleErrors'),
	taskPaths	= require('../lib/taskPaths');

gulp.task('watch', ['browsersync'], function () {
	var tasks = ['images', 'css', 'js', {name:'html', src: [['html', true], ['html', 'init']]}];
	
	for (var i = 0, len = tasks.length; i < len; i++) {
		var task = tasks[i];
		var watchPath = [];
		if (typeof task == 'string') {
			var taskConfig = config.tasks[task];
			watchPath.push(taskPaths('', task).src);
		} else {
			var taskConfig = config.tasks[task.name];
			for (var p in task.src) {
				watchPath.push(taskPaths('', task.src[p], true).src)
			}
			task = task.name;
		}
		
		gulp.watch(watchPath, ['minify-' + task]);
	};
});
