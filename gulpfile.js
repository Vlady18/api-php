//initialize all of our variables
var app, babel, babelPreset, minify, pug, base, concat, directory, gulp, gutil, hostname, path, refresh, sass, imagemin, minifyCSS, del, browserSync, autoprefixer, gulpSequence, shell, sourceMaps, plumber;

var autoPrefixBrowserList = ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'];

//load all of our dependencies
//add more here if you want to include more libraries
const { series, watch } = require('gulp');
gulp = require('gulp');
pug = require('gulp-pug');
gutil = require('gulp-util');
concat = require('gulp-concat');
babel = require('gulp-babel');
babelPreset = require('babel-preset-env');
minify = require('gulp-babel-minify');
sass = require('gulp-sass');
sourceMaps = require('gulp-sourcemaps');
imagemin = require('gulp-imagemin');
minifyCSS = require('gulp-minify-css');
browserSync = require('browser-sync');
autoprefixer = require('gulp-autoprefixer');
gulpSequence = require('gulp-sequence').use(gulp);
shell = require('gulp-shell');
plumber = require('gulp-plumber');

function taskBrowserSync () {
  browserSync({
      server: {
          baseDir: "app/"
      },
      options: {
          reloadDelay: 250
      },
      notify: false
  });
}

function taskBabel() {
  return gulp.src('dist/scripts/app.js')
      // .pipe(plumber())
      .pipe(babel({
          "presets": [["minify", {
            "mangle": {
              "exclude": ["ParserError", "NetworkError"]
            }
          }]]
        }))
    .pipe(gulp.dest('dist/scripts'))
}

function taskCss () {
  return gulp.src('dist/styles/*.css')
          .pipe(plumber())
//          .pipe(minifyCSS())
          // .pipe(stripCssComments(true))
          .pipe(gulp.dest('dist/styles/'));
}


//compiling our Javascripts
function taskScripts () {
  return gulp.src(['app/scripts/src/_includes/**/*.js', 'app/scripts/src/**/*.js'])
              //prevent pipe breaking caused by errors from gulp plugins
              .pipe(plumber())
              //this is the filename of the compressed version of our JS
              .pipe(concat('app.js'))
              // babel
              .pipe(babel())
              //catch errors
              .on('error', gutil.log)
              //where we will store our finalized, compressed script
              .pipe(gulp.dest('app/scripts'))
              //notify browserSync to refresh
              .pipe(browserSync.reload({stream: true}));
}

//compiling our SCSS files
function taskScss () {
  return gulp.src('app/styles/scss/*.scss')
              //prevent pipe breaking caused by errors from gulp plugins
              .pipe(plumber({
                errorHandler: function (err) {
                  console.log('error', err);
                  this.emit('end');
                }
      }))
              //get sourceMaps ready
              .pipe(sourceMaps.init())
              //include SCSS and list every "include" folder
              .pipe(sass({
                    errLogToConsole: true,
                    includePaths: [
                        'app/styles/scss/'
                    ],
//                    outputStyle: 'compressed'
              }))
              .pipe(autoprefixer({
                 browsers: autoPrefixBrowserList,
                 cascade:  true
              }))
              // .pipe(stripCssComments(true))
              //catch errors
              .on('error', gutil.log)
              //the final filename of our combined css file
              // .pipe(concat('styles.css'))
              //get our sources via sourceMaps
              .pipe(sourceMaps.write())
              //where to save our final, compressed css file
              .pipe(gulp.dest('app/styles/'))
              //notify browserSync to refresh
              .pipe(browserSync.reload({stream: true}));
}

function taskHtml () {
  return gulp.src('app/*.html')
      .pipe(plumber())
      .pipe(browserSync.reload({stream:true}))
      //catch errors
      .on('error', gutil.log);
}

exports.default = function() {
  taskScripts();
  taskScss();
  taskHtml();
  taskBrowserSync();
  watch('app/scripts/src/**', taskScripts);
  watch('app/styles/scss/**', taskScss);
  watch('app/*.html', taskHtml);
};
