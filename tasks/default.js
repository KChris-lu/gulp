var gulp         = require('gulp')
    runSequence  = require('gulp-run-sequence');

gulp.task('default', function(cb) {
  //global.production = false;
  runSequence(
    'clean', 
    ['minify-images'], 
    ['minify-css', 'minify-js', 'minify-html'], 
    'watch', 
    cb
  );
});
