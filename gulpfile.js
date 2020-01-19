//var gulp = require('gulp'),
//    source = require('vinyl-source-stream'),
//    buffer = require('vinyl-buffer'),

const gulp = require('gulp'),
    del = require("del"),
    bs = require('browser-sync').create(),
    rename = require("gulp-rename"),
    path = require("path"),
    stream = bs.stream,
    reload = bs.reload,
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    concatFilenames = require('gulp-concat-filenames'),
    notify = require("gulp-notify"),
    plumber = require("gulp-plumber"),
    gulpCopy = require('gulp-copy'),
    sourcemaps = require("gulp-sourcemaps");

gulp.task('clean:build', function (done) {
    return del('build');
    done();
});
gulp.task('pug', function () {
    return gulp.src('src/pug/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Pug',
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
        .pipe(stream());
});

gulp.task('scssConcat', function () {
    let concatFilenamesOptions = {
        root: './src/pug/',
        prepend: "@import './../../pug/",
        append: "';"
    }
    return gulp.src('./src/pug/**/*.scss')
        .pipe(concatFilenames('_autoimport.scss', concatFilenamesOptions))
        .pipe(gulp.dest('./src/assets/scss'));
});
gulp.task('scssCompile', function () {
    return gulp.src('src/assets/scss/style.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/assets/css'))
        .pipe(stream());
});
gulp.task('scss', gulp.series('scssConcat', 'scssCompile' ));

gulp.task('copy:js', function () {
    return gulp.src('src/assets/js/**/*.js')
        .pipe(gulp.dest('build/assets/js'))
        .pipe(reload({stream: true}));
});
gulp.task('js', gulp.series('copy:js'));


gulp.task('copy:img', function (done) {
    gulp.src('src/assets/img/**/*.*')
        .pipe(gulp.dest('build/assets/img'))
        .pipe(stream());

    gulp.src('src/images/**/*.*')
        .pipe(gulp.dest('build/images'))
        .pipe(stream());
    
    var imagesPath = 'build/images/';
    gulp.src(['src/pug/components/**/images/**/*.*', 'src/pug/blocks/**/images/**/*.*', 'src/pug/ui/**/images/**/*.*'])
    .pipe(rename(function (file) {
          file.dirname = path.dirname(file.dirname);
      }))
    .pipe(gulp.dest(imagesPath)).pipe(stream());
    
    var assetsImagesPath = 'build/assets/img/';
    gulp.src(['src/pug/components/**/assets/**/*.*', 'src/pug/blocks/**/assets/**/*.*', 'src/pug/ui/**/assets/**/*.*'])
    .pipe(rename(function (file) {
          file.dirname = path.dirname(file.dirname);
      }))
    .pipe(gulp.dest(assetsImagesPath)).pipe(stream());

    done();
});
gulp.task('copy:fonts', function () {
    return gulp.src('src/assets/fonts/**/*.*')
        .pipe(gulp.dest('build/assets/fonts'))
        .pipe(stream());
});

gulp.task('copy:libs', function () {
    return gulp.src('src/assets/libs/**/*.*')
        .pipe(gulp.dest('build/assets/libs'))
        .pipe(stream());
});

gulp.task('importLibs', function (done) {
    gulp.src('src/assets/libs/**/*.js')
        .pipe(concat('libsBundle.js'))
        .pipe(gulp.dest('build/assets/js/'));

    gulp.src('src/assets/libs/**/*.css')
        .pipe(concat('libsBundle.css'))
        .pipe(gulp.dest('build/assets/css/'));
    done();
});

gulp.task('importJsBlocks', function () {
    return gulp.src('src/pug/**/*.js')
        .pipe(concat('blocks.js'))
        .pipe(gulp.dest('build/assets/js/'));
});


gulp.task('serve', function (done) {
    bs.init({
        server: {
            baseDir: 'build/',
            open: false
        }
    }, function () {});
    done();
});

gulp.task('watchers', function (done) {
    gulp.watch('src/pug/**/*.pug', gulp.series('pug'));
    gulp.watch('src/**/*.scss', gulp.series('scssCompile'));
    gulp.watch('src/assets/js/**/*.js', gulp.series('copy:js'));
    gulp.watch('src/assets/img/**/*.*', gulp.series('copy:img'));
    gulp.watch('src/images/**/*.*', gulp.series('copy:img'));
//    gulp.watch( ['src/assets/img/**/*.*', 'src/images/**/*.*', 'src/pug/components/**/images/**/*.*', 'src/pug/blocks/**/images/**/*.*', 'src/pug/ui/**/images/**/*.*', 'src/pug/components/**/images/**/*.*', 'src/pug/blocks/**/images/**/*.*', 'src/pug/ui/**/images/**/*.*'], gulp.series('copy:img'));
    gulp.watch('src/assets/fonts/**/*.*', gulp.series('copy:fonts'));
    gulp.watch('src/assets/libs/**/*.*', gulp.series('importLibs'));
    gulp.watch('src/pug/**/*.js', gulp.series('importJsBlocks'));
    //    gulp.watch('src/assets/js/**/*.js').on('change', reload({stream: true}));
    done();
});

gulp.task(
    'server',
    gulp.series(
        gulp.parallel('pug', 'scss', 'js', 'copy:fonts', 'copy:img', 'copy:libs', 'importLibs', 'importJsBlocks'),
        'serve',
        'watchers'
    )
);

gulp.task('default', gulp.series('clean:build', 'server'));