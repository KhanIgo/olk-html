module.exports = function(arguments) {
    $.gulp.task(
    'server',
    $.gulp.series(
        $.gulp.parallel('pug', 'scss', 'js', 'vueify', 'copyFonts', 'copyImg', 'copyLibs', 'importLibs', 'importJsBlocks'),
        'serve',
        'watchers'
    )
);
};