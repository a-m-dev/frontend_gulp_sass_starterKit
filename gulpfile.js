
// Import Some requirments
const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const imageMin = require('gulp-imagemin')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const wait = require('gulp-wait')
const browserSync = require('browser-sync').create()


// Build Folder
// const BUILD_FOLDER = 'public/'


// Coping Html Files
gulp.task('markup' , () => {
    gulp.src('src/*.html')
        .pipe(gulp.dest('public/'))
})




// Compile Sass
gulp.task('sass' , () => {
    gulp.src('src/sass/app.scss')
        .pipe(wait(500)) // this will prevent from "@import file could not find or is unreadable"
        .pipe(sass().on('error' , sass.logError))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream())
})




// Concat Js files
gulp.task('scripts' , () => {
    gulp.src('src/js/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.stream())
})




// Minify Images
gulp.task('minify' , () => {
    gulp.src('src/img/*')
        .pipe(imageMin())
        .pipe(gulp.dest('public/img'))
        .pipe(browserSync.stream())
})




// Serve
gulp.task('serve' , ['markup' , 'sass' , 'scripts' , 'minify'] , () => {

    browserSync.init({
        server: 'public/'
    })


    gulp.watch('src/*.html' , ['markup'])
    gulp.watch('src/js/*.js' , ['scripts'])
    gulp.watch('src/sass/**/*.scss' , ['sass'])
    gulp.watch('src/*.html').on('change' , browserSync.reload)

})




gulp.task('default' , ['serve'])




