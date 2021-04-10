const {src, dest, watch, series} = require("gulp");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const browserSync = require("browser-sync");
const autoPrefixer = require("autoprefixer");


// Function for watching the scss
function scssTask() {
    return src("app/scss/style.scss", {sourcemaps: true})
    .pipe(sass())
    .pipe(postcss([autoPrefixer(), cssnano()]))
    .pipe(dest("dist", {sourcemaps: "."}));
}

// Task for the browserSync
function browserSyncServe(callback) {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });
    callback();
}


// Task for reloading the browsersync
function browserSyncReload(callback) {
    browserSync.reload();
    callback();
}

// Function for watching 
function watchTask() {
    watch("*.html", browserSyncReload);
    watch("app/scss/**/*.scss", series(scssTask, browserSyncReload));
}

exports.default = series(
    scssTask,
    browserSyncServe,
    watchTask
);