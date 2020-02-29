module.exports = function(arguments) {
    $.gulp.task('pug', function () {
        return $.gulp.src('src/pug/*.pug')
            .pipe($.plumber({
                errorHandler: $.notify.onError(function (err) {
                    return {
                        title: 'Pug',
                        message: err.message
                    }
                })
            }))
            .pipe($.pug({
                pretty: true
            }))
            .pipe($.gulp.dest('build'))
            .pipe($.bs.stream());
    });
};