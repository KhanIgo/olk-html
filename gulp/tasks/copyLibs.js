module.exports = function(){
    $.gulp.task('copyLibs', function () {
    return $.gulp.src('src/assets/libs/**/*.*')
        .pipe( $.gulp.dest('build/assets/libs') )
        .pipe( $.bs.stream() );
});
};