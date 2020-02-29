module.exports = function() {
    $.gulp.task('scssConcat', function () {
    let concatFilenamesOptions = {
        root: './src/pug/',
        prepend: "@import './../../pug/",
        append: "';"
    }
    return $.gulp.src('./src/pug/**/*.scss')
        .pipe($.concatFilenames('_autoimport.scss', concatFilenamesOptions))
        .pipe($.gulp.dest('./src/assets/scss'));
});
};