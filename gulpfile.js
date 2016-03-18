/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var gulp = require('gulp');
var del = require('del');
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var replace = require('gulp-html-replace');
var server = require('gulp-server-livereload');
var gutil = require('gulp-util');
var reactify = require('reactify');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');


/////////////////////////////////////////////////


var bundler = browserify({
    entries: ['./application/src/app.jsx'],
    transform: [reactify, ["babelify", {"presets": ["es2015"]}]],
    extensions: ['.jsx'],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
});


var notify = function (error) {
    var message = 'In: ';
    var title = 'Error: ';

    if (error.description) {
        title += error.description;
    } else if (error.message) {
        title += error.message;
    }

    if (error.filename) {
        var file = error.filename.split('/');
        message += file[file.length - 1];
    }

    if (error.lineNumber) {
        message += '\nOn Line: ' + error.lineNumber;
    }
    console.log(error);
     
};

function bundle() {
    return bundler
            .bundle()
            .on('error', notify);

}




/////////////////////////////////////////////////
gulp.task('clean', function ( ) {

    del.sync(['build', 'reports']);

});


gulp.task('build-jsx', function () {

    bundle()
            .pipe(source('comp-app.min.js'))
            .pipe(streamify(uglify()))
            .pipe(gulp.dest('./build/assets/app/'));

});


gulp.task('copy-resources', function () {



    gulp.src(
            ['./application/assets/app/*']


            ).pipe(gulp.dest('./build/assets'));

    gulp.src(
            ['./application/assets/libs/jquery/dist/jquery.min.js']


            ).pipe(gulp.dest('./build/assets/js/'));
    
    gulp.src(
            ['./application/assets/libs/bootstrap/dist/**/*']


            ).pipe(gulp.dest('./build/assets/bootstrap/dist/'));

    gulp.src(
            ['./application/*.html']


            ).pipe(gulp.dest('./build'));



});


//gulp.task('build', ['clean', 'minify-copy-js', 'copy-resources','prepare-index-html']);
gulp.task('build', ['clean', 'copy-resources','build-jsx']);