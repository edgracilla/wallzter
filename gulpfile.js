'use strict'

const PATHS = {
  js: ['*.js', '*/*.js', '*/**/*.js', '!node_modules/**', '!gulpfile.js'],
  json: ['*.json', '*/*.json', '*/**/*.json', '!node_modules/**'],
}

const del = require('del')
const gulp = require('gulp')
const env = require('gulp-env')
const mocha = require('gulp-mocha')
const jshint = require('gulp-jshint')
const nodemon = require('gulp-nodemon')
const sequence = require('gulp-sequence')
const plumber = require('gulp-plumber')
const obfuscate = require('gulp-javascript-obfuscator')
const jsonlint = require('gulp-json-lint')
const standard = require('gulp-standard')

gulp.task('js-lint', function () {
  return gulp.src(PATHS.js)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'))
})

gulp.task('json-lint', function () {
  return gulp.src(PATHS.json)
    .pipe(plumber())
    .pipe(jsonlint({
      comments: true
    }))
    .pipe(jsonlint.report())
})

gulp.task('standard', function () {
  return gulp.src(PATHS.js)
    .pipe(plumber())
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true,
      quiet: true
    }))
})

gulp.task('wall-test', function () {
  require('dotenv').config()

  env({
    vars: {
      NODE_ENV: 'wall-test'
    }
  })

  return gulp.src(['mock/wall.test.js'])
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec',
      exit: true
    }))
})

gulp.task('lint', ['js-lint', 'json-lint', 'standard'])
gulp.task('wallzt', ['wall-test'])
gulp.task('default', ['wallzt'])
