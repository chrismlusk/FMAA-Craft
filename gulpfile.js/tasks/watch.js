const gulp = require('gulp');
const stylesTask = require('./styles');
const scriptsTask = require('./scripts');

const { styles, scripts } = require('../config').paths;

const watchTask = () => {
  gulp.watch(styles.src, stylesTask);
  gulp.watch(scripts.src, scriptsTask);
};

gulp.task('watch', watchTask);
module.exports = watchTask;
