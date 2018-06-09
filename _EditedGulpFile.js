// Here is the gulp file

var gulp = require('gulp')
var wait = require('gulp-wait')
var babel = require('gulp-babel')
var sass = require('gulp-sass')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var imageMin = require('gulp-imagemin')
var browserSync = require('browser-sync').create()

const BUILD_FOLDER = 'public/'

// Copy All Html files
gulp.task('markup' , () => {
  gulp.src('src/*.html')
    .pipe(gulp.dest(BUILD_FOLDER))
})



// Compile Sass Files
gulp.task('sass' , () => {
  gulp.src('src/sass/**/*.scss')
    .pipe(wait(250))
    .pipe(sass().on('error' , sass.logError))
    .pipe(gulp.dest(BUILD_FOLDER + 'css'))
    .pipe(browserSync.stream())
})



// Concat Js Files
gulp.task('js' , () => {
  gulp.src('src/js/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(concat('main.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(BUILD_FOLDER + 'js'))
    .pipe(browserSync.stream())
})


// Minify Image
gulp.task('images' , () => {
  gulp.src('src/images/**/*')
    .pipe(imageMin())
    .pipe(gulp.dest(BUILD_FOLDER + 'images'))
    .pipe(browserSync.stream())
})


// Copying Fonts
gulp.task('fonts' , () => {
  gulp.src('src/fonts/**/*')
    .pipe(gulp.dest(BUILD_FOLDER + 'fonts'))
    .pipe(browserSync.stream())
})


// setting up default task 
gulp.task('serve' , ['markup' , 'sass' , 'js' , 'images' , 'fonts'] , ()=> {
 
  browserSync.init({
    port: 8000,
    server: BUILD_FOLDER
  })

  gulp.watch('src/*.html', ['markup'])
  gulp.watch('src/js/*.js', ['js'])
  gulp.watch('src/sass/**/*.scss', ['sass'])
  gulp.watch('src/fonts/*' , ['fonts'])
  gulp.watch('src/images/**/*' , ['images'])
  gulp.watch('src/*.html').on('change' , browserSync.reload);

})


gulp.task('default' , ['serve']);















// Pkg.json
{
  "name": "09_traversy_parallax",
  "version": "1.0.0",
  "description": "",
  "main": "gulpfile.js",
  "scripts": {
    "start": "gulp",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "browser-sync": "^2.24.4",
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.1",
    "gulp-concat": "^2.6.1",
    "gulp-imagemin": "^4.1.0",
    "gulp-sass": "^4.0.1",
    "gulp-uglify": "^3.0.0",
    "gulp-wait": "0.0.2"
  },
  "dependencies": {}
}
