module.exports = {
  src: "./src",
  dest: "./web/public",

  static: {
    src: "./src/static",
    dest: "./web/public"
  },

  fonts: {
    src: "./src/fonts/*",
    dest: "./web/public/fonts",
  },

  icons: {
    src: "./src/icons/*",
    dest: "./web/public/icons",
  },

  images: {
    src: "./src/images/**/*.{jpg,jpeg,png,gif,svg}",
    dest: "./web/public/images",
  },

  styles: {
    src: "./src/styles/**/*.scss",
    dest: "./web/public/styles",
  },

  scripts: {
    src: "./src/scripts",
    dest: "./web/public/scripts",
  },
};
