var gulp = require('gulp'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();

//Static Server
gulp.task('serve', ['sass'], function() {

  browserSync.init({
      server: "./app",
      open: false,
      reloadDelay: 1000,
      reloadDebounce: 3000
      // browser: "google chrome beta launcher"
  });

  gulp.watch('app/scss/**/*.{scss,sass}', ['sass']);
  gulp.watch(['app/css/**/*.css', 'app/src/**/*.js', 'app/lib/**/*.js', 'app/**/*.html']).on('change', browserSync.reload);
});

// Gulp Sass Task 
gulp.task('sass', function() {
  gulp.src('app/scss/**/*.{scss,sass}') // no return for sass to work properly
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['> 1%', 'last 5 versions', 'Firefox ESR'],
          cascade: false
      }))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('app/css'))
      // .pipe(browserSync.reload({stream: true}));
      .pipe(browserSync.stream());
});

// Gulp assets compilation 
gulp.task('dist:useref', ['dist:clean','sass'], function () {
  var useref = require('gulp-useref'),
      uglify = require('gulp-uglify'),
      rev = require('gulp-rev'),
      revReplace = require('gulp-rev-replace'),
      smoosher = require('gulp-smoosher'),
      csso = require('gulp-csso'),

      assets = useref.assets();

  return gulp.src('./app/**/*.html')
    .pipe(assets)
    .pipe(gulpif('*.css', csso()))
    .pipe(gulpif('*.js', uglify()))
    .pipe(rev())
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(revReplace())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dist:inline', ['dist:useref'], function() {
  var smoosher = require('gulp-smoosher');
      //minifyHtml = require('gulp-minify-html');
  return gulp.src('dist/**/*.html')
    .pipe(smoosher())
    //.pipe(minifyHtml({empty:true}))
    .pipe(gulp.dest('dist/'));

});

// Copy image assets without modification
gulp.task('dist:assets', ['dist:clean'], function() {
  
    var assets = gulp.src([
                      'app/assets/**/*',
                      'app/*',
                      '!app/*.html',
                      '!app/favicons',
                      '!app/src',
                      '!app/lib',
                      '!app/scss'
                      ],{base:'app'})
                      .pipe(gulp.dest('dist/')),

        favicons = gulp.src(['app/favicons/**/*'],{base:'app/favicons'})
                      .pipe(gulp.dest('dist/'));

    return assets+favicons;
  });

gulp.task('dist:clean', function(cb) {
  var del = require('del');

  del([
      'dist/*'
      // 'app/css/*'
      ], cb);
});

gulp.task('default',['serve']);
gulp.task('build',[ 
                    'dist:clean', 
                    'dist:useref',
                    'dist:inline',
                    'dist:assets' 
                    ]);