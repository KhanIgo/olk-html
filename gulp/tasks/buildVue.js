module.exports = function (done) {
    $.gulp.task('vueify', function (done) {        
        $.gulp.src(['src/assets/vue/**/*.js', 'src/assets/vue/**/*.vue'])
            .pipe( $.browserify({
                transform: ['vueify'], 
                runtimeCompiler:true, 
                insertGlobals : true, 
                debug : $.prod }) 
            )
            //.pipe( $.vueify() )
            .pipe( $.gulp.dest('build/assets/app') );
        
   
        done();
    });
};
