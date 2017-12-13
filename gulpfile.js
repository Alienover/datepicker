var gulp = require('gulp');
var sequence = require('run-sequence');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var cleanCss = require('gulp-clean-css');

gulp.task('default', function () {
  sequence('js','js-watch', 'css', 'css-watch');
});

gulp.task('js', function () {
  gulp.src('./assets/js/*.js')
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./public'));
});

gulp.task('js-watch', function () {
  gulp.watch('./assets/js/*.js', function () {
    sequence('js');
  });
});

gulp.task('css', function () {
  gulp.src('./assets/css/*.css')
  .pipe(cleanCss())
  .pipe(gulp.dest('./public'));
});

gulp.task('css-watch', function () {
  gulp.watch('./assets/css/*.css', function () {
    sequence('css');
  });
});
