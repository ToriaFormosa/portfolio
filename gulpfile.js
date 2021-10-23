const { src, dest, parallel, series, watch } = require('gulp');

const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const pug = require('gulp-pug');
const rigger = require('gulp-rigger');
const svgstore = require("gulp-svgstore");
const rename = require("gulp-rename");

function browsersync() {
	browserSync.init({
		server: { baseDir: 'build/' },
		notify: false,
		online: true,
		host: 'localhost',
		port: 3000
	})
}

function startwatch() {
	watch(['src/**/*.js', '!src/**/*.min.js'], scripts);
	watch('src/**/styles/**/*', styles);
	watch('src/**/*.html').on('change', browserSync.reload);
	watch('src/images/**/*', images);
	watch('src/view/**/*.pug', pugHtml);
	watch('src/icons/**/*.svg', icons);
}

function pugHtml() {
	return src('src/view/pages/*.pug')
		.pipe(plumber())
		.pipe(pug({ pretty: true}))
		.pipe(dest('build/'))
		.pipe(browserSync.stream())
}

function scripts() {
	return src('src/js/main.js')
		.pipe(plumber())
		.pipe(rigger())
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(dest('build/js/'))
		.pipe(browserSync.stream())
}

function php() {
	return src('src/php/**/*.*')
			.pipe(dest('build/php/'));
}

function styles() {
	return src('src/styles/main.scss')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(concat('main.min.css'))
		.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true }))
		.pipe(cleancss( { level: { 1: { specialComments: 0 } } } ))
		.pipe(sourcemaps.write('./maps'))
		.pipe(dest('build/css/'))
		.pipe(browserSync.stream())
}

function fonts() {
	return src('src/fonts/**/*.{eot,svg,ttf,otf,woff,woff2}')
		.pipe(plumber())
		.pipe(dest('build/fonts/'))
}

function images() {
	return src('src/images/**/*')
		.pipe(plumber())
		.pipe(newer('build/images/'))
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.mozjpeg({quality: 75, progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: false},
					{cleanupIDs: false}
				]
			})
		]))
		.pipe(dest('build/images/'))
		.pipe(browserSync.stream())
}

function icons() {
	return src('src/icons/**/*.svg')
			.pipe(plumber())
			.pipe(imagemin([
				imagemin.gifsicle({interlaced: true}),
				imagemin.mozjpeg({quality: 75, progressive: true}),
				imagemin.optipng({optimizationLevel: 5}),
				imagemin.svgo({
					plugins: [
						{removeViewBox: false},
						{cleanupIDs: false}
					]
				})
			]))
			.pipe(svgstore({
				inlineSvg: true
			}))
			.pipe(rename('sprite.svg'))
			.pipe(dest('build/images/'))
			.pipe(browserSync.stream())
}

function favicons() {
	return src('src/favicons/*.*')
		.pipe(dest('build/favicons'));
}

function cleandist() {
	return del('build/**/*', { force: true })
}


exports.browsersync = browsersync;
exports.startwatch = startwatch;
exports.pugHtml = pugHtml;
exports.scripts = scripts;
exports.styles = styles;
exports.fonts = fonts;
exports.images = images;
exports.icons = icons;
exports.favicons = favicons;
exports.php = php;

exports.build = series(cleandist, pugHtml, fonts, styles, scripts, images, icons, favicons, php);

exports.default = parallel(pugHtml, fonts, styles, scripts, images, icons, favicons, browsersync, startwatch, php);