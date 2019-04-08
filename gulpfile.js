'use strict';

const gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglifyjs'),
	cssmin = require('gulp-minify-css'),
	rigger = require('gulp-rigger'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	cache = require('gulp-cache'),
	plumber = require('gulp-plumber'),
	autoprefixer = require('gulp-autoprefixer'),
	sourcemaps = require('gulp-sourcemaps'),
	babel = require('gulp-babel');

const path = {
	dist: {
		root: './dist/',
		js: './dist/js/',
		jsmain: './dist/js',
		css: './dist/css/',
		images: './dist/images/',
		fonts: './dist/fonts/'
	},

	app: {
		root: './app/',
		html: './app/*.html',
		htmlViews: './app/views/pages/*.html',
		style: './app/css/',
		scss: './app/scss/site.scss',
		js: './app/js/',
		jsComponents: './app/js/component/', 
		images: './app/images/',
		fonts: './app/fonts/'
	},

	watch: {
		html: './app/views/**/*.html',
		style: './app/scss/',
		js: './app/js/component/*.js'
	}
};

const js_plugins = [
	path.app.jsComponents + 'custom.js'
];

gulp.task('browser-sync', () => { //local host for development
	browserSync({
		server: {
			baseDir: path.app.root
		},
		notify: false,
		//tunnel: true,
		host: 'localhost',
		open: 'external',
		port: 3000,
		logPrefix: "server"
	});
});

//Task for Dev:
gulp.task('html:dev', (done) => { //compile .html pages in ./app (root);
    gulp.src(path.app.htmlViews)
		.pipe(rigger())
        .pipe(gulp.dest(path.app.root)) 
		.pipe(browserSync.reload({ stream: true }));

	done();
});

gulp.task('style:dev', (done) => { //build .css from .scss
	gulp.src(path.app.scss)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], { cascade: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.app.style))
		.pipe(browserSync.reload({stream: true}));

	done();
});

gulp.task('js:dev', (done) => {
	gulp.src(js_plugins)
		.pipe(sourcemaps.init())
		.pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.app.js))
		.pipe(browserSync.reload({ stream: true }));

	done();
});

gulp.task('watch', () => {
	gulp.watch(path.watch.html, gulp.series('html:dev')); // watch for .html components -> compile to ./app (.html pages);
	gulp.watch(path.watch.style, gulp.series('style:dev')); // watch .scss in dir scss  -> compile to ./app/css (.css styles);
	gulp.watch(path.watch.js, gulp.series('js:dev'));   // watch .js files in dir js -> compile to ./app/js (scripts.js);
});

gulp.task('build:dev', //build for DEV env
	gulp.series(
		'html:dev',
		'style:dev',
		'js:dev'), (done) => {

	done();
});


//Task for Prod:
gulp.task('clean', (done) => {
	del.sync('dist'); // remove 'dist' dir before build:prod

	done();
});

gulp.task('html:prod', (done) => { //copy pages from ./app/*.html
	gulp.src(path.app.html)
		.pipe(gulp.dest(path.dist.root));

	done();
});

gulp.task('style:prod', (done) => { //recompile styles from ./app/scss
	gulp.src(path.app.scss)
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], { cascade: true }))
		.pipe(cssmin())
		.pipe(gulp.dest(path.dist.css));

	done();
});

gulp.task('js:prod', (done) => { //recompile scripts from ./app/js/components 
	gulp.src(js_plugins)
		.pipe(concat('scripts.js'))
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest(path.dist.js));

	done();
});

gulp.task('img:prod', (done) => { //copy images from ./app/images/
	gulp.src(path.app.images + '**/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		})))
		.pipe(gulp.dest(path.dist.images));

	done();
});

gulp.task('clear', (callback) => {
	return cache.clearAll();
})

gulp.task('build:prod', //build for PROD env
	gulp.series(
		'clean',
		'html:prod',
		'style:prod',
		'js:prod',
		'img:prod'), (done) => {

	done();
});

gulp.task('default', gulp.parallel('browser-sync', 'watch', 'build:dev'));