'use strict';

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	pug = require('gulp-pug'),
	autoprefixer = require('gulp-autoprefixer');


function startWatch() {
	gulp.watch('src/styles/**/*.scss', compileSass);
	gulp.watch('src/views/**', compilePug);
	gulp.watch('src/js/*.js', copy);
	startBrowserSync('build');
}

// Browser sync
function startBrowserSync(folder) {
	browserSync.init({
		notify: false,
		logPrefix: 'LL',
		server: {
			baseDir: folder
		}
	});
}

function copy() {
	gulp.src(['src/js/*.js'])
		.pipe(gulp.dest('build/js/'));
}

function compileSass () {
	gulp.src('src/styles/*.scss')
		.pipe(sass({
			errLogToConsole: true,
			outputStyle: 'expanded'
		}))
		.on('error', swallowError)
		.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
		.pipe(gulp.dest('build/styles'))
		.pipe(browserSync.stream());
}

function compilePug() {
	gulp.src('src/views/pages/*.pug')
		.pipe(pug({
			pretty: true
		}))
		.on('error', swallowError)
		.pipe(gulp.dest('build'));

	browserSync.reload();
}

function moveFolder(folder) {
	gulp.src('src/' + folder + '/**')
		.pipe(gulp.dest('build/' + folder + '/'));
}

gulp.task('default', function() {
	compilePug();
	compileSass();
	moveFolder('images');
	copy();
	startWatch();
});

function swallowError(error) {
	// If you want details of the error in the console
	console.log(error.toString());
	this.emit('end')
}
