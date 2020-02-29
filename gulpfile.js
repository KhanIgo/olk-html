global.$ = {
    gulp: require('gulp'),
    gulpif: require('gulp-if'),
    del: require("del"),
    fs: require("fs"),
    bs: require('browser-sync').create(),
    rename: require("gulp-rename"),
    path: require("path"),
    pug: require('gulp-pug'),
    sass: require('gulp-sass'),
    concat: require('gulp-concat'),
    concatFilenames: require('gulp-concat-filenames'),
    notify: require("gulp-notify"),
    plumber: require("gulp-plumber"),
    gulpCopy: require('gulp-copy'),
    args: require('yargs').argv,
    minify: require('gulp-minify'),
    sourcemaps: require("gulp-sourcemaps"),
    browserify: require("gulp-browserify"),
    
//    browserify: require("browserify"),
    vueify: require('vueify'),
    babelify: require('babelify'),
    
    
    useBrowserify: false,
    minifyJs: true,
    pathes: {
        tasks: require('./gulp/config/tasks')
    }
}
$.prod = $.args.prod || false;

$.pathes.tasks.forEach(function(taskPath){
    console.log(taskPath);
    require(taskPath)();
});













//gulp.task('default', gulp.series('clean', 'server'));
$.gulp.task('default', $.gulp.series('server'));