module.exports = function(){
    $.gulp.task('scss', $.gulp.series('scssConcat', 'scssCompile' ));
};