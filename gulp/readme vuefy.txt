//https://www.npmjs.com/package/gulp-vueify
var vueify = require('gulp-vueify');
gulp.task('vueify', function () {
  return gulp.src('components/**/*.vue')
    .pipe(vueify())
    .pipe(gulp.dest('./dist'));
});




//https://www.npmjs.com/package/gulp-browserify
var gulp = require('gulp');
var browserify = require('gulp-browserify');
// Basic usage
gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./build/js'))
});