var gulp = require('gulp'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    lr = require('tiny-lr'),  
    browserSync = require('browser-sync').create(),
    server = lr();

gulp.task('watch', ['sass', 'html'], function() {
    browserSync.init(["css/*.css", "js/*.js"], {
        server: "template/"
    });
    gulp.watch("src/sass/*.scss", ['sass']);
    gulp.watch("src/html/*.html", ['html']);
    gulp.watch("template/*.html").on('change', browserSync.reload);
    gulp.watch("template/css/*.css").on('change', browserSync.reload);
});

gulp.task('html', function () {
    gulp.src('./src/html/*.html') 
        .pipe(rigger()) 
        .pipe(gulp.dest('./template/')); 
});

gulp.task('sass', function() {
    gulp.src('./src/sass/style.scss')
    .pipe(sass().on('error', console.log))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }).on('error', console.log))
    .pipe(gulp.dest('./template/css/'));
});

gulp.task('default', ['watch']);
