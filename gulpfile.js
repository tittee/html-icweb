'use strict';
const gulp = require('gulp');
// const pug = require('gulp-pug');
// const pugLinter = require('gulp-pug-linter');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const uglify = require('gulp-uglify');
const pump = require('pump');
const autoprefixer = require('gulp-autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');

const prefixerOptions = {
  browsers: ['last 2 versions'],
};

const localMsg = {
  message: 'This app is powered by gulp.pug recipe for BrowserSync',
};

var paths = {
  basePath: 'src/',
  destPath: 'assets/',
  styles: {
    // By using styles/**/*.sass we're telling gulp to check all folders for any sass file
    src: 'src/*.scss',
    // Compiled files will end up in whichever folder it's found in (partials are not compiled)
    dest: 'assets/css',
  },
  pugs: {
    src: ['src/templates/*.pug', 'src/templates/**/*.pug'],
    dest: 'assets/',
  },
  images: {
    src: 'src/images/*',
    dest: 'assets/images/',
  },
  jsfiles: {
    src: 'src/js/*',
    dest: 'assets/js/',
  },
};

// ...
const style = () => {
  return (
    gulp
      .src(paths.styles.src)
      // Initialize sourcemaps before compilation starts
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer(prefixerOptions))
      .pipe(minifyCSS())
      // Use postcss with autoprefixer and compress the compiled file using cssnano
      .pipe(postcss([autoprefixer(), cssnano()]))
      // Now add/write the sourcemaps
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.styles.dest))
  );
};

const html = () => {
  return (
    gulp
      .src(paths.pugs.src)
      // .pipe(
      //   pug({
      //     locals: localMsg,
      //   })
      // )
      // .pipe(pugLinter({ reporter: 'default' }))
      .pipe(sourcemaps.write(.))
      .pipe(gulp.dest(paths.pugs.dest))
  );
};

const image = () => {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest('assets/images'))
    .pipe(reload({ stream: true }));
};

const jsfile = (cb) => {
  pump(
    [gulp.src(paths.jsfiles.src), uglify(), gulp.dest(paths.jsfiles.dest)],
    cb
  );
};

function watch() {
  browserSync.init({
    server: {
      baseDir: './assets',
    },
  });
  gulp.watch('src/scss/*.scss', style);
  gulp.watch('src/js/*js', jsfile);
  gulp.watch('src/images/*', image);
  gulp.watch('src/templates/*.pug', html);
}
// ...

exports.watch = watch;
