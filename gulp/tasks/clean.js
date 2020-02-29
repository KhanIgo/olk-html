module.exports = function(arguments) {
    $.gulp.task('clean', function (done) {
        return $.del('build');
        done();
    });
};