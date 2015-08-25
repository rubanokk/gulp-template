var gulp = require('gulp'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    lr = require('tiny-lr'),  
    browserSync = require('browser-sync').create(),
    server = lr();


gulp.task('sass', function() {
    gulp.src('./assets/sass/style.scss')
    .pipe(sass().on('error', console.log))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }).on('error', console.log))
    .pipe(gulp.dest('./public/css/'));
});

gulp.task('html', function () {
    gulp.src('./assets/template/*.html') 
        .pipe(rigger()) 
        .pipe(gulp.dest('./public/template/')); 

});

gulp.task('lr-server', function() {  
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
})

gulp.task('default', function() {  
    gulp.run('lr-server', 'sass', 'html');

    gulp.watch('./assets/template/*.html', function(event) {
        gulp.run('html');
    })

    gulp.watch('./assets/sass/*.scss', function(event) {
        gulp.run('sass');
    })
})