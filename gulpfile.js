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

gulp.task('clean', function ( ) {

    del.sync(['build', 'reports']);

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
gulp.task('build', ['clean', 'copy-resources']);