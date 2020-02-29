module.exports = function(){
    $.gulp.task('importJsBlocks', function () {
    return $.gulp.src('src/pug/**/*.js')
        .pipe( $.concat('blocks.js') )
        .pipe( $.gulpif( $.minifyJs, $.minify() ) )
        .pipe( $.gulp.dest('build/assets/js/') );
});
};