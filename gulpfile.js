var gulp = require('gulp');
var cdnify = require('gulp-google-cdn');
var ngmin = require('gulp-ngmin');
var uglifyjs = require('gulp-uglify');
var clean = require('gulp-clean');
var minifyHtml = require('gulp-minify-html');

gulp.task('cdnify', function() {
    return gulp.src(['app/**/*.html', '!app/vendor/**'])
        .pipe(cdnify(require('./bower.json'), {
            cdn: require('yandex-cdn'),
            componentsPath: 'vendor'
        }))
        .pipe(minifyHtml({empty: true}))
        .pipe(gulp.dest('dist'));
});


gulp.task('minifyjs', function() {
    return gulp.src(['app/**/*.js', '!app/vendor/**'])
        .pipe(ngmin())
        .pipe(uglifyjs())
        .pipe(gulp.dest('dist'));

});

gulp.task('copy', function() {
    return gulp.src(['app/**/*.css', 'app/**/*.png', '!app/vendor/**'])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist')
        .pipe(clean());
});


gulp.task('default', ['cdnify', 'minifyjs', 'copy']);
