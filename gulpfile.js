'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var jison = require('gulp-jison');
var mocha = require('gulp-mocha');
var rimraf = require('gulp-rimraf');

gulp.task('clean', function() {
  return gulp.src('./lib/parser.js', { read: false })
    .pipe(rimraf());
});

gulp.task('jison', function() {
    return gulp.src('./src/*.y')
        .pipe(jison())
        .pipe(gulp.dest('./lib/'));
});

gulp.task('mocha', function () {
    return gulp.src('test/*', {read: false})
        .pipe(mocha());
});

gulp.task('test', function () {
    return runSequence('mocha');
});

gulp.task('build', function () {
	return runSequence('clean', 'jison', 'test');
});

gulp.task('default', ['build']);
