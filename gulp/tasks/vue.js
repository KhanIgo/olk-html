module.exports = function(done){
    $.gulp.task('vue', function (done) {
        $.gulp.src('src/assets/img/**/*.*')
            .pipe( $.gulp.dest('build/assets/img') )
            .pipe( $.bs.stream() );

    

    done();
});
};