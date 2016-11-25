var config  = require('../config')
var path    = require('path')

module.exports = function(module, task, isWatch) {

	function isArray(o) {
		return Object.prototype.toString.call(o) === '[object Array]';
	}

	function parseExtension(ext) {
		if (isArray(ext) && ext.length > 1) {
			return '.{' + ext.join(',') + '}';
		} else {
			return '.' + ext;
		}
	}

	var taskName, extensions;
	if (isArray(task)) {
		taskName = task.shift();
		subTask = task.shift();
	} else {
		taskName = task;
	}

	var taskConfig = config.tasks[taskName];

	if (isArray(task)) {
		if (subTask === true) {
			extensions = !taskConfig.extensions ? '/*' : ('/*' + parseExtension(taskConfig.extensions));
		} else {
			extensions = taskConfig[subTask]['src'];
		}
	} else {
		extensions = !taskConfig.extensions ? '/**/*' : ('/**/*' + parseExtension(taskConfig.extensions));
	}

	return {
		src: path.join(config.root.src, module, taskConfig.src, extensions),
		dest: path.join(config.root.dest, module, taskConfig.dest)
	}

}
