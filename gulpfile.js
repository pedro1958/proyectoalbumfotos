const { src, dest, watch, series } = require("gulp");

// CSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sourcemaps = require("gulp-sourcemaps");
const cssnano = require("cssnano");

// Imagenes
const imagemin = require("gulp-imagemin");
const { gifsicle, mozjpeg, optipng, svgo } = imagemin;
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css() {
	return (
		src("src/scss/app.scss")
			.pipe(sourcemaps.init())
			// .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
			.pipe(sass().on("error", sass.logError))
			.pipe(postcss([autoprefixer(), cssnano()]))
			.pipe(sourcemaps.write("."))
			.pipe(dest("dist/css"))
	);
}

function images() {
	return src("src/img/**/*")
		.pipe(
			imagemin([
				gifsicle({ interlaced: true }),
				mozjpeg({ quality: 75, progressive: true }),
				optipng({ optimizationLevel: 5 }),
				svgo({
					plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest("dist/img"));
}

function imagesWebp() {
	const options = { quality: 50 };
	return src("src/img/**/*.{jpg,jpeg,png}")
		.pipe(webp(options))
		.pipe(dest("dist/img"));
}

function imagesAvif() {
	const options = { quality: 50 };
	return src("src/img/**/*.{jpg,jpeg,png}")
		.pipe(avif(options))
		.pipe(dest("dist/img"));
}

function dev() {
	watch("./src/scss/**/*.scss", css);
	watch("src/img/**/*", images);
}

exports.css = css;
exports.dev = dev;
exports.images = images;
exports.imagesWebp = imagesWebp;
exports.imagesAvif = imagesAvif;

exports.default = series(images, imagesWebp, imagesAvif, css, dev);
