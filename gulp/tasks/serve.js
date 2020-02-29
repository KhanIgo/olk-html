module.exports = function() {
    $.gulp.task('serve', function (done) {
    $.bs.init({
        server: {
            baseDir: 'build/',
            open: false
        }
    }, function () {});
    done();
});
};