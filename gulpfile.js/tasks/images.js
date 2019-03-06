const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const size = require('gulp-size');

const { paths, plugins } = require('../config');
const $ = plugins.imagemin;

const imagesTask = () => {
  return gulp
    .src(paths.images.src)
    .pipe(cache(imagemin($.plugins, $.options)))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(size({ title: 'public/images' }));
};

gulp.task('images', imagesTask);
module.exports = imagesTask;
