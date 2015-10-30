'use strict';
var gulp = require('gulp');
var watchify = require('watchify');
var browserify = require('browserify');
var reactify = require('reactify');
var sass = require('gulp-ruby-sass');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var path = require('path');

var jshint = require('gulp-jshint');

var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var dir = {
  "scss": {
    "src": './scss/',
    "build": './build/'
  },
  "browserify": {
    entries: ['./js/main.js'],
    build: './build/'
  }
}

//==================browserify ,generate main.js
var b = watchify(browserify({
  entries: dir.browserify.entries,
  debug: true
}));
b.transform(reactify);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
  return b.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulp.dest(dir.browserify.build));
}

gulp.task('bundle', bundle);

//=================sass, build scss-->css
gulp.task('sass', function () {
  return sass(dir.scss.src, {
      sourcemap: false
    })
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(dir.scss.build));
});

// watch scss
var scss_watch_files = path.join(dir.scss.src, '/**/*.scss');
gulp.watch(scss_watch_files, ['sass']);

gulp.task('default', ['bundle', 'sass']);
gulp.task('build', ['bundle', 'sass', 'minify-js', 'minify-css']);
