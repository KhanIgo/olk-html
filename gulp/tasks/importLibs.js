module.exports = function(){
    $.gulp.task('importLibs', function (done) {
    $.gulp.src('src/assets/libs/**/*.js')
        .pipe( $.concat('libsBundle.js') )
        .pipe( $.gulpif( $.minifyJs, $.minify() ) )
        .pipe( $.gulp.dest('build/assets/js/') );

    $.gulp.src('src/assets/libs/**/*.css')
        .pipe( $.concat('libsBundle.css') )
        .pipe( $.gulp.dest('build/assets/css/') );
    done();
});
};