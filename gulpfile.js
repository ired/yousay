var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

//Static Server
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app",
        open: false,
        reloadDebounce: 5000
        // browser: "google chrome beta launcher"
    });

    gulp.watch('app/scss/**/*.{scss,sass}', ['sass']);
    gulp.watch(['app/src/**/*.js', 'app/lib/**/*.js', 'app/**/*.html']).on('change', browserSync.reload);
});

// Gulp Sass Task 
gulp.task('sass', function() {
    gulp.src('app/scss/**/*.{scss,sass}') // no return for sass to work properly
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}));
});

// Gulp assets compilation 
gulp.task('dist:usemin', ['dist:clean'], function () {
    var usemin = require('gulp-usemin');
    var uglify = require('gulp-uglify');
    var rev = require('gulp-rev');
    var uncss = require('gulp-uncss');
    var csso = require('gulp-csso');

  return gulp.src('app/**/*.html', { base: 'app' } )
      .pipe(usemin({
        css: [  
                sass({outputStyle: 'compressed'}),
                uncss({html: ['app/**/*.html'],ignoreSheets:['app/css/normalize.css']}),
                csso(),
                rev()
            ],

        js: [uglify(), rev()],
        inlinejs: [uglify()],
        //html: []
        // inlinecss: [minifyCss(), 'concat']
      }))
      .pipe(gulp.dest('dist'));
});

// Copy image assets without modification
gulp.task('dist:images', ['dist:clean'], function() {
    return gulp.src('app/images/**/*', { base: 'app' })
        .pipe(gulp.dest('dist'));
});

gulp.task('dist:clean', function(cb) {
    var del = require('del');

    del([
        'dist/*'
        ], cb);
});

gulp.task('default',['serve']);
gulp.task('build',[ 
                    'dist:clean', 
                    'dist:usemin',
                    'dist:images' 
                    ]);