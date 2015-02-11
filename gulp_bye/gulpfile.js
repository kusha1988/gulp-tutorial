var gulp = require('gulp');
var argv = require('yargs').argv;
var gutil = require('gulp-util');
gulp.task('greeting', function(){
    var message = 'bye';
    if(argv.mr){
        message += " Mr.";
    }
    gutil.log(  gutil.colors.green(message) );
});





