const gulp = require("gulp");
const newer = require("gulp-newer");
const gulpif = require("gulp-if");
const sourcemaps = require("gulp-sourcemaps");
const stylelint = require("gulp-stylelint");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cleanCss = require("gulp-clean-css");
const size = require("gulp-size");
// const browserSync = require('browser-sync');

const { paths, plugins } = require("../config");
const styles = paths.styles;

// explicitly set compiler per https://github.com/dlmanning/gulp-sass#basic-usage
sass.compiler = require("node-sass");

function lintStyles() {
  return gulp.src(styles.src).pipe(
    stylelint({
      failAfterError: true,
      fix: true,
      reporters: [{ formatter: "verbose", console: true }],
    })
  );
}

function compileStyles() {
  return gulp
    .src(styles.src)
    .pipe(newer(".tmp/styles"))
    .pipe(sourcemaps.init())
    .pipe(sass(plugins.gulpSass.options).on("error", sass.logError))
    .pipe(postcss([autoprefixer(plugins.autoprefixer.options)]))
    .pipe(gulp.dest(".tmp/styles"))
    .pipe(
      gulpif(
        process.env.ENVIRONMENT === "production",
        cleanCss(plugins.cleanCss.options)
      )
    )
    .pipe(size({ title: "public/styles" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(styles.dest))
    .pipe(gulp.dest(".tmp/styles"));
  // .pipe(browserSync.stream());
}

const stylesTask = gulp.parallel(lintStyles, compileStyles);

gulp.task("styles", stylesTask);
module.exports = stylesTask;
