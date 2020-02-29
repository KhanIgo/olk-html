module.exports = function(){
    $.gulp.task('copyFonts', function () {
    return $.gulp.src('src/assets/fonts/**/*.*')
        .pipe($.gulp.dest('build/assets/fonts'))
        .pipe($.bs.stream());
});
};