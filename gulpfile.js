const 	gulp         = require('gulp'),
	    sass         = require('gulp-sass'),
	    browserSync  = require('browser-sync'),
	    concat       = require('gulp-concat'),
	    uglify       = require('gulp-uglifyjs'),
      	cssmin 		 = require('gulp-minify-css'),
	    del          = require('del'),
	    imagemin     = require('gulp-imagemin'),
	    pngquant     = require('imagemin-pngquant'),
	    cache        = require('gulp-cache'),
	    plumber 	 = require('gulp-plumber'),
	    autoprefixer = require('gulp-autoprefixer'),
	    sourcemaps 	 = require('gulp-sourcemaps'),
	    babel 		 = require('gulp-babel');

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
		style: './app/css/',
        js: './app/js/',
        images: './app/images/',
        fonts: './app/fonts/'
    },
	scss: {
		root: './app/scss/',
		main: './app/scss/site.scss'
	},
};

gulp.task('scss', (done) => {
	gulp.src(path.scss.main)
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))			
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], { cascade: true }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(path.app.style))
		.pipe(browserSync.reload({stream: true}))
	done();
});

gulp.task('browser-sync', () => {
	browserSync({
		server: {
			baseDir: path.app.root
		},
		notify: false,
		tunnel: true,
		host: 'localhost',
		open: 'external',
		port: 3000,
		logPrefix: "server"
	});
});

gulp.task('watch', () => {
	gulp.watch(path.scss.root, gulp.series('scss'), browserSync.reload); // watch .scss in dir scss 
	gulp.watch(path.app.html, browserSync.reload); // watch .html in root 
	gulp.watch(path.app.js + '**/*.js', browserSync.reload);   // watch .js files in dir js
});

gulp.task('clean', (done) => {
	del.sync('dist'); // remove 'dist' dir before build:prod
	done();
});

gulp.task('html:prod', (done) => {
	gulp.src(path.app.html)
		.pipe(gulp.dest(path.dist.root));
	done();
});

gulp.task('style:prod', (done) => {
	gulp.src(path.scss.main)
		.pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
		.pipe(autoprefixer(['last 10 versions', '> 1%', 'ie 9', 'ie 10'], { cascade: true }))
        .pipe(cssmin())
		.pipe(gulp.dest(path.dist.css))
	done();
});

gulp.task('js:prod', (done) => {
	gulp.src([
		path.app.js + 'jquery-3.1.1.js',
		path.app.js + 'custom.js'
		])
	.pipe(concat('scripts.js'))
	.pipe(babel({
		presets: ['@babel/preset-env']
	}))
	.pipe(uglify())
	.pipe(gulp.dest(path.dist.js))

	done();
});

gulp.task('img:prod', (done) => {
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

gulp.task('build:prod', 
	gulp.series(
		'clean',
		'html:prod',
		'style:prod',
		'js:prod',
		'img:prod'
	), (done) => {

	done();
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));