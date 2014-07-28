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

gulp.task('mocha.parser', function () {
    return gulp.src('test/parser/*', {read: false})
        .pipe(mocha());
});

gulp.task('mocha.walker', function () {
    return gulp.src('test/walker/*', {read: false})
        .pipe(mocha());
});

gulp.task('mocha.lowerer', function () {
    return gulp.src('test/lowerer/*', {read: false})
        .pipe(mocha());
});

gulp.task('mocha', ['mocha.parser', 'mocha.walker', 'mocha.lowerer']);

gulp.task('test', function () {
    return runSequence('mocha');
});

gulp.task('build', function () {
	return runSequence('clean', 'jison', 'test');
});

gulp.task('default', ['build']);
