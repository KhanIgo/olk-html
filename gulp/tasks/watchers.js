module.exports = function() {
    $.gulp.task('watchers', function (done) {
        $.gulp.watch('src/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('src/**/*.scss', $.gulp.series('scssCompile'));
        $.gulp.watch('src/assets/js/**/*.js', $.gulp.series('copyJs'));
        $.gulp.watch('src/assets/img/**/*.*', $.gulp.series('copyImg'));
        $.gulp.watch('src/images/**/*.*', $.gulp.series('copyImg'));
    //    $.gulp.watch( ['src/assets/img/**/*.*', 'src/images/**/*.*', 'src/pug/components/**/images/**/*.*', 'src/pug/blocks/**/images/**/*.*', 'src/pug/ui/**/images/**/*.*', 'src/pug/components/**/images/**/*.*', 'src/pug/blocks/**/images/**/*.*', 'src/pug/ui/**/images/**/*.*'], $.gulp.series('copy:img'));
        $.gulp.watch('src/assets/fonts/**/*.*', $.gulp.series('copyFonts'));
        $.gulp.watch('src/assets/libs/**/*.*', $.gulp.series('importLibs'));
        $.gulp.watch('src/pug/**/*.js', $.gulp.series('importJsBlocks'));
        $.gulp.watch(['src/**/*.vue', 'src/assets/vue/**/*.js'], $.gulp.series('vueify'));
        //    $.gulp.watch('src/assets/js/**/*.js').on('change', reload({stream: true}));
        done();
    });
};  