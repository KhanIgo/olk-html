module.exports = function(arguments) {
    $.gulp.task('scssCompile', function () {
    return $.gulp.src('src/assets/scss/style.scss')
        .pipe($.plumber({
            errorHandler: $.notify.onError(function (err) {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe( $.gulpif(!$.prod, $.sourcemaps.init()))
        .pipe( $.sass() )
        .pipe( $.gulpif( !$.prod, $.sourcemaps.write()))
        .pipe( $.gulpif($.prod, $.minify() ))
        .pipe( $.gulp.dest('build/assets/css') )
        .pipe( $.bs.stream() );
});
};