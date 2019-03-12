const gulp = require('gulp');
const stylesTask = require('./styles');
const scriptsTask = require('./scripts');
// const browserSyncTask = require('./browserSync');

const { styles, scripts } = require('../config').paths;

const watchTask = () => {
  gulp.watch(styles.src, stylesTask);
  gulp.watch(scripts.src, scriptsTask);
};

gulp.task('watch', watchTask);
// gulp.task('watch', gulp.parallel(watchTask, browserSyncTask));
module.exports = watchTask;
