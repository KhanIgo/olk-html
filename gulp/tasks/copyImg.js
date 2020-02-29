module.exports = function(done){
    $.gulp.task('copyImg', function (done) {
    $.gulp.src('src/assets/img/**/*.*')
        .pipe( $.gulp.dest('build/assets/img') )
        .pipe( $.bs.stream() );

    $.gulp.src('src/images/**/*.*')
        .pipe( $.gulp.dest('build/images') )
        .pipe( $.bs.stream() );
    
    var imagesPath = 'build/images/';
    $.gulp.src(['src/pug/components/**/images/**/*.*', 'src/pug/blocks/**/images/**/*.*', 'src/pug/ui/**/images/**/*.*'])
    .pipe($.rename(function (file) {
          file.dirname = $.path.dirname(file.dirname);
      }))
    .pipe($.gulp.dest(imagesPath)).pipe($.bs.stream());
    
    var assetsImagesPath = 'build/assets/img/';
    $.gulp.src(['src/pug/components/**/assets/**/*.*', 'src/pug/blocks/**/assets/**/*.*', 'src/pug/ui/**/assets/**/*.*'])
    .pipe($.rename(function (file) {
          file.dirname = $.path.dirname(file.dirname);
      }))
    .pipe($.gulp.dest(assetsImagesPath)).pipe($.bs.stream());

    done();
});
};