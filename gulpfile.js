'use strict'

const gulp = require('gulp');
const less = require('gulp-less');
const src_path = './src/styles/*.less';
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const concatCss = require('gulp-concat-css');


gulp.task('less', function () {

  return gulp.src(src_path)
    .pipe(less({}))
    .pipe(concatCss("main.css"))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./dist'))
});



gulp.task('watch', function(){
  return gulp.watch(src_path, gulp.series('less'));
});

gulp.task('default', gulp.series('less', 'watch'));