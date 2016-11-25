if (global.production) return

var gulp        = require('gulp'),
    browsersync = require('browser-sync'),
    config      = require('../config').browsersync;

gulp.task('browsersync', function() {
  browsersync(config);
});
