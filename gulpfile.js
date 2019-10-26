const path = {
    sass:'./sass',
    css: './public.css',
}

const gulp = require('gulp')
const sass = require ('gulp-sass')
const sassLocation = path.sass +'/app.scss'
const allSassFiles = path.sass + '/**/*.scss'

gulp.task('style', () => {
    gulp.src(sassLocation)
        .pipe(sass())
        .pipe(gulp.dest(path.css))
})

gulp.task('watch', () => {
    gulp.watch(allSassFiles, ['style'])
})