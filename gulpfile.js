const gulp = require('gulp');
const remove = require('del');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const pump = require('pump');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();



gulp.task('clean', function(){

    return remove(['dist']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });

});

// переносим html файлы
gulp.task('html', function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'))
});

// переносим fonts файлы
gulp.task('fonts', function() {
    return gulp.src('fonts/*.*')
        .pipe(gulp.dest('dist/fonts'))
});

// перенос и оптимизация картинок
gulp.task('images', function () {
    return gulp
        .src('img/**/*.{png,svg,jpg}')
        .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced: true}))
        .pipe(gulp.dest('dist/img/'));
});


gulp.task('vendor:css', function(){
        return gulp.src(['css/normalize.scss'])
            .pipe(sourcemaps.init({largeFile: true}))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(csso())
            .pipe(rename({
                suffix: ".min"
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('dist/css'));
    }
);

gulp.task('build:css', function(){
    return gulp.src(['css/style.scss', '!css/normalize.scss'])
        .pipe(sourcemaps.init({largeFile: true}))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
    }
);

gulp.task('vendor:js', function(cb){
    pump([
            gulp.src(['js/jquery-3.2.1.js', 'js/phoneMaskPlugin.js']),
            sourcemaps.init({largeFile: true}),
            concat('vendor.min.js'),
            uglify(),
            sourcemaps.write(),
            gulp.dest('dist/js')
        ],
        cb);
});

gulp.task('build:js', function(cb){
    pump([
        gulp.src(['js/*.js', '!js/jquery-3.2.1.js', '!js/phoneMaskPlugin.js']),
        sourcemaps.init(),
        concat('main.min.js'),
        uglify(),
        sourcemaps.write(),
        gulp.dest('dist/js')
    ],
    cb);
});

gulp.task('reload', function(done){
    browserSync.reload();
    done();
});

// либо это, либо browserSync
gulp.task('watch', function(){
    gulp.watch('*.html', ['html']);
    gulp.watch('css/*.scss', ['build:css']);
    gulp.watch('js/*.js', ['build:js']);
    gulp.watch('img/*.*', ['images']);
    gulp.watch('fonts/*.*', ['fonts']);
});

gulp.task('serve', ['html', 'fonts', 'images', 'vendor:js', 'build:js', 'vendor:css', 'build:css'], function() {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch('dist/**/*.*', ['reload']);
});

gulp.task('default', ['serve', 'watch']);