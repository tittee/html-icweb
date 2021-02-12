"use strict";
let gulp = require("gulp");
// const pug = require('gulp-pug');
// const pugLinter = require('gulp-pug-linter');
let sass = require("gulp-sass");
let rename = require("gulp-rename");
let sourcemaps = require("gulp-sourcemaps");
let imagemin = require("gulp-imagemin");
let browserSync = require("browser-sync").create();
let reload = browserSync.reload;
let uglify = require('gulp-uglify-es').default;
let postcss = require("gulp-postcss");
let babel = require('gulp-babel');

let prefixerOptions = {
  browsers: ["last 2 versions"],
};

let localMsg = {
  message: "This app is powered by gulp.pug recipe for BrowserSync",
};

let paths = {
  basePath: "src/",
  destPath: "assets/",
  styles: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: "src/scss/*.scss",
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "assets/css",
  },
  cssfiles: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: "src/css/*.css",
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: "assets/css",
  },
  pugs: {
    // src: ["src/templates/*.pug", "src/templates/**/*.pug"],
    src: ["src/templates/*.html"],
    dest: "assets/",
  },
  images: {
    src: "src/images/*",
    dest: "assets/images/",
  },
  jsfiles: {
    src: "src/js/*",
    dest: "assets/js/",
  },
};

const style = () => {
  return (
    gulp
      .src(paths.styles.src)      
      .pipe(sourcemaps.init())
      .pipe(sass().on("error", sass.logError))
      .pipe(postcss([require("precss"), require("autoprefixer")]))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest(paths.styles.dest))
  );
};

const css = () => {
  return gulp
    .src(paths.cssfiles.src)
    .pipe(postcss([require("precss"), require("autoprefixer")]))    
    .pipe(gulp.dest(paths.cssfiles.dest));
};

const html = () => {
  return gulp
    .src(paths.pugs.src)
    .pipe(gulp.dest(paths.pugs.dest));
};

// .pipe(
//   pug({
//     locals: localMsg,
//   })
// )
// .pipe(pugLinter({ reporter: 'default' }))

const image = () => {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest("assets/images"));
};

const jsfile = () => {
  return gulp
    .src(paths.jsfiles.src)    
    .pipe(sourcemaps.init())
    // .pipe(uglify())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.jsfiles.dest));
};

function watch() {
  browserSync.init({
    server: {
      baseDir: "./assets",
    },
  });
  gulp.watch("src/scss/*.scss", style);
  gulp.watch("src/css/*.css", css);
  gulp.watch("src/js/*js", jsfile);
  gulp.watch("src/images/*", image);
  gulp.watch("src/templates/*.html", html); //gulp.watch("src/*.pug", html);
}
exports.watch = watch;
