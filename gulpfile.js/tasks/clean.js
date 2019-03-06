const gulp = require('gulp');
const del = require('del');

const { paths } = require('../config');

const cleanTask = () => {
  const allCompiledFiles = [
    `.tmp/`,
    `${paths.dest}/*`,
    `!${paths.dest}/.git`,
  ];

  return del(process.env.ENVIRONMENT === 'production' ? ['.tmp/'] : allCompiledFiles, {
    force: true,
  });
};

gulp.task('clean', cleanTask);
module.exports = cleanTask;
