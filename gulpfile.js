const del = require('del');
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const panini = require('panini');

gulp.task('clean', function () {
	del.sync(['dist/**']);
});

gulp.task('htmls', function() {
	gulp.src('src/html/pages/**/*.html')
	.pipe(panini({
		root: 'src/html/pages/',
		layouts: 'src/html/layouts/',
		partials: 'src/html/partials/'
	}))
	.pipe(gulp.dest('dist'));
});
gulp.task('htmls:watch', function() {
	gulp.watch('src/html/{layouts,partials,pages}/**/*.html', ['htmls', 'pages:reset']);
});

gulp.task('styles', function () {
	gulp.src('src/scss/style.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'))
});
gulp.task('styles:watch', function () {
	gulp.watch('src/scss/**/*.scss', ['styles']);
});

gulp.task('scripts', function() {
	gulp.src('src/js/**/*')
		.pipe(gulp.dest('dist/js'));
});
gulp.task('scripts:watch', function () {
	gulp.watch('src/js/**/*', ['scripts']);
});

gulp.task('data', function() {
	gulp.src('src/data/**/Dockerfile')
		.pipe(gulp.dest('dist'));
});
gulp.task('data:watch', function () {
	gulp.watch('src/data/**/*', ['data']);
});

gulp.task('pages:reset', function(done) {
	panini.refresh();
	done();
});

gulp.task('default', ['clean', 'htmls', 'htmls:watch', 'styles', 'styles:watch', 'scripts', 'scripts:watch', 'data', 'data:watch', 'pages:reset']);