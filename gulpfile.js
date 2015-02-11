var gulp = require('gulp');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var webserver = require('gulp-webserver');
var util = require('gulp-util');
var notify = require('gulp-notify');
var chug = require( 'gulp-chug' );
var argv = require('yargs').argv;
var runSequence = require('run-sequence');
var fs = require('fs');

gulp.task('default', ['cssConcat', 'jsUglify', 'watch', 'webserver']);



gulp.task( 'greeting', function () {
    gulp.task('greeting', function(){
        var message = 'alocha';
        if(argv.mr){
            message += " Mr.";
        }
        console.log(message)
    });
} );

gulp.task( 'test-chug', function () {
    gulp.src( './gulp_hello/gulpfile.js', { read: false }   )
        .pipe( chug({
            tasks:  [ 'greeting'],
            args:   [ '--mr']
        })
    );

    gulp.src( './gulp_bye/gulpfile.js', { read: false }   )
        .pipe( chug({
            tasks:  [ 'greeting'],
            args:   [ '--mr']
        })
    );

    gulp.src( './gulpfile.js', { read: false }   )
        .pipe( chug({
            tasks:  [ 'greeting'],
            args:   [ '--mr']
        })
    )
} );






// gulp release --number x.x.x
gulp.task('release', function(){
    var number = util.env.number;
    if(!number) return;
    if(fs.existsSync('./release/' + number)){
        return console.error('Number ' + number + ' already exists')
    }

    gulp.src('./dist/**/*.*')
        .pipe(notify('Making release'))
        .pipe(gulp.dest('./release/' + number));
});

gulp.task('webserver', function(){
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('cssConcat', function(){
    gulp.src('./css/**/*.css')
        .pipe(autoprefixer())
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(notify('cssConcat finished...'));
});

gulp.task('cssMin', function(){
    gulp.src('./css/**/*.css')
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('./dist'))
        .pipe(notify('cssMin finished...'));
});

gulp.task('jsUglify', function(){
    gulp.src('./js/**/*.js')
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'))
        .pipe(notify('jsUglify finished...'));
});

gulp.task('watch', function(){
    gulp.watch('./css/**/*.css', ['cssConcat']);
    gulp.watch('./js/**/*.js', ['jsUglify']);
});

gulp.task('imageMin', function(){
    gulp.src('./img/**/*.*')
        .pipe(imagemin({
            optimizationLevel: 7
        }))
        .pipe(gulp.dest('./dist/img'))
        .pipe(notify('imageMin finished...'));

});

