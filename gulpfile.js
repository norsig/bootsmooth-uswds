'use strict';

// dependency requirements
var gulp   = require('gulp'),
    sass   = require('gulp-sass'),
    rename = require('gulp-rename'),
    csso = require('gulp-csso'),
	babelify = require('babelify'),
    browserify = require("browserify"),
    postcss    = require('gulp-postcss'),
    source = require("vinyl-source-stream");

// Styles task
gulp.task('stylesheet', function () {
  return gulp.src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
	.pipe(csso())
	.pipe( postcss([ require('precss'), require('autoprefixer') ]) )
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./'));
});

// Javascript  task
gulp.task('javascript', function() {
   return browserify({
        entries: ["./js/scripts.js"]
    })
    .transform(babelify.configure({
        presets : ["es2015"]
    }))
    .bundle()
    .pipe(source("build.js"))
    .pipe(gulp.dest("./dist"))
  ;
});

// Watch tasks
gulp.task('watch', ['build'], function() {
    // styles
    gulp.watch(['./scss/**/*.scss'], [
        'stylesheet'
    ]);
    
    // js
    gulp.watch(['./js/**/*.js'], [
        'javascript'
    ]);
});

// build task
gulp.task('build', ['stylesheet', 'javascript']);

// default task
gulp.task('default', ['watch']);