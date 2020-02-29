module.exports = function(done){
    $.gulp.task('copyJs', function (done) {
        $.gulp.src('src/assets/js/**/*.js')
            .pipe( $.gulpif( $.useBrowserify, $.browserify({ insertGlobals : true, debug : $.prod }) ) )
            .pipe( $.gulpif( $.minifyJs, $.minify() ) )
//            .pipe( $.minify() )
            .pipe( $.gulp.dest('build/assets/js') )
            .pipe( $.bs.reload({stream: true}) );
        done();
    });
};