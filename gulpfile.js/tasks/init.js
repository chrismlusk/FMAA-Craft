const gulp = require("gulp");

const { fonts, icons } = require("../config").paths;

function getFonts() {
  return gulp.src(fonts.src).pipe(gulp.dest(fonts.dest));
}

function getIcons() {
  return gulp.src(icons.src).pipe(gulp.dest(icons.dest));
}

const initTask = gulp.series(getFonts, getIcons);

gulp.task("init", initTask);
module.exports = initTask;
