const {src, dest, series, watch} = require('gulp');
const concat = require('gulp-concat');
const htmlMin = require('gulp-htmlmin');
const autoprefixes = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const image = require('gulp-imagemin');
const notify = require('gulp-notify')
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const gulpif = require('gulp-if')
const argv = require('yargs').argv
const sourcemaps = require('gulp-sourcemaps')
const del = require('del')
const browserSync = require('browser-sync').create();

const clean = () => {
  return del(['dist'])
}

const isDev = () => {
  return !argv.prod;
}

const isProd = () => {
  return !!argv.prod;
}

const styles = () => {
  return src('src/styles/**/*.css')
  .pipe(gulpif(isDev(), sourcemaps.init()))
  .pipe(concat('main.css'))
  .pipe(gulpif(isProd(), autoprefixes({
    cascade: false,
  })))
  .pipe(gulpif(isProd(), cleanCSS({
    level: 2,
  })))
  .pipe(gulpif(isDev(), sourcemaps.write()))
  .pipe(dest('dist/css'))
  .pipe(browserSync.stream())
}

const htmlMinify = () => {
  return src('src/**/*.html')
  .pipe(gulpif(isProd(), htmlMin({
    collapseWhitespace: true,
})))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}


const scripts = () => {
  return src([
    'src/js/components/**/*.js',
    'src/js/index.js'
  ])
  .pipe(gulpif(isDev(), sourcemaps.init()))
  .pipe(gulpif(isProd(), babel({
    presets:['@babel/env']
  })))
  .pipe(concat('app.js'))
  .pipe(gulpif(isProd(), uglify({
    toplevel: true
  })).on('error', notify.onError()))
  .pipe(gulpif(isDev(), sourcemaps.write()))
  .pipe(dest('dist'))
  .pipe(browserSync.stream())
}

const fonts = () => {
  return src('src/fonts/**/*')
  .pipe(dest('dist/fonts'))
}


const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  })
}

const images = () => {
  return src(['src/img/**/*.jpg',
              'src/img/**/*.png',
              'src/img/**/*.jpeg',
              'src/img/**/*.svg'
  ])
  .pipe(gulpif(isProd(), image()))
  .pipe(dest('dist/img'))
}

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/js/**/*.js', scripts)
watch('src/**', fonts)


exports.styles = styles
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, htmlMinify, styles, scripts, fonts, images, watchFiles)

