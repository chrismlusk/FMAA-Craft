const { resolve } = require("path");
const gulp = require("gulp");
const webpack = require("webpack");
const eslint = require("gulp-eslint");

const { scripts } = require("../config").paths;

function lintScripts() {
  return gulp
    .src(scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

const WEBPACK_CONFIG = {
  mode: process.env.ENVIRONMENT === "production" ? "production" : "development",
  entry: {
    main: `${scripts.src}/main.js`,
  },
  output: {
    filename: "[name].bundle.js",
    path: resolve(process.env.INIT_CWD, "web/public/scripts"),
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: 'all'
  //   }
  // }
};

function compileScripts() {
  return new Promise(resolve =>
    webpack(WEBPACK_CONFIG, (err, stats) => {
      if (err) console.log("Webpack", err);
      console.log(stats.toString()); // eslint-disable-line no-console
      resolve();
    })
  );
}

const scriptsTask = gulp.series(lintScripts, compileScripts);

gulp.task("scripts", scriptsTask);
module.exports = scriptsTask;
