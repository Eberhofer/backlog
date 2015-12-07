var gulp = require('gulp');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('default', function () {
  return browserify('./source/items.js')
    .transform(reactify)
    .bundle()
    .pipe(source('backlog.js'))
    .pipe(gulp.dest('./public/'));
});
