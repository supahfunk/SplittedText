'use strict';

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    header = require('gulp-header'),
    gulpIncludeTemplate = require("gulp-include-template"),
    tfs = require('gulp-tfs');


var head = [
    '/*--------------------------------------------------',
    'Website by Websolute',
    '--------------------------------------------------*/',
    '/**/'].join('\n');


/***********************
*** TFS GET LATEST ***
************************/
gulp.task('getLatest:all', function () {
    return gulp.src([
        './css/*',
        './sass/**/*'
    ])
        .pipe(tfs.get());
});


/*******************
*** TFS CHECKOUT ***
********************/
gulp.task('checkout', function () {
    return gulp.src([
        './css/main.css'
    ])
        .pipe(tfs.checkout())
});


/***********************
*** TFS CHECKOUT ALL ***
************************/
gulp.task('checkout:all', function () {
    return gulp.src([
        './css/*'
    ])
        .pipe(tfs.checkout());
});


/***********
*** SASS ***
************/
gulp.task('sass', function () {
    console.log('COMPILING SASS');
    return gulp.src([
        './sass/main.scss'
    ])
        .pipe(plumber(function (error) {
            console.log('sass error: compile plumber', error);
        }))
        .pipe(header(head))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./docs/css'))
    // minify
    //.pipe(cssmin())
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(gulp.dest('./css'));
});


/*****************
*** SASS WATCH ***
******************/
gulp.task('sass:watch', function () {
    var watcher = gulp.watch('./sass/**/*.scss', ['sass']);
    watcher.on('change', function (e) {
        console.log('watcher.on.change type: ' + e.type + ' path: ' + e.path);
    });
    return watcher;
});


/*********************
*** SASS BOOTSTRAP ***
**********************/
gulp.task('sass:bootstrap', function () {
    console.log('COMPILING SASS');
    return gulp.src('./sass/bootstrap/bootstrap.scss')
        .pipe(plumber(function (error) {
            console.log('sass error: compile plumber', error);
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./css'))
    // minify
    //.pipe(cssmin())
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(gulp.dest('./css'));
});



/*********************
*** SASS ALL ***
**********************/
gulp.task('sass:all', function () {
    console.log('COMPILING SASS');
    return gulp.src('./sass/**/*.scss')
        .pipe(plumber(function (error) {
            console.log('sass error: compile plumber', error);
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1', 'Safari >= 7', 'iOS >= 7'],
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./css'))
    // minify
    .pipe(cssmin())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css'));
});


/*********
*** JS ***
**********/
gulp.task('js', function () {
    console.log('MINIFYING JS');
    return gulp.src('./js/main.js')
        // minify
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./js'));
});


/***************
*** JS WATCH ***
****************/
gulp.task('js:watch', function () {
    var watcher = gulp.watch('./js/main.js', ['js']);
    watcher.on('change', function (e) {
        console.log('watcher.on.change type: ' + e.type + ' path: ' + e.path);
    });
    return watcher;
});


/****************
*** WEBSERVER ***
*****************/
gulp.task('webserver', function () {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: false,
            port: 40000,
            open: true
        }));
});


/***************************
*** PUBLISH TO WEBSERVER ***
****************************/
gulp.task('publish', function () {
    gulp.src(['./**/*', '!./node_modules/**/*', '!./**/*.db'])
        .pipe(gulp.dest('')) // W:/folder
});


/************
*** START ***
*************/
gulp.task('default', ['webserver', 'sass', 'sass:watch']);