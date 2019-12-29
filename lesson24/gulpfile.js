let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let imagemin = require('gulp-imagemin');
let rimraf = require('rimraf');
let autoprefixer = require('gulp-autoprefixer');
const bs = require("browser-sync").create();
function processCSS(cb){
    gulp.src("src/scss/*.scss")
    .pipe(concat('style.scss'))
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest("build"))
    .pipe(bs.stream())
    cb()
}
function spyCSS(cb){
    gulp.watch("src/scss/*.scss", processCSS)
    cb()
}
function processHTML(cb){
    gulp.src("src/*.html")
    .pipe(gulp.dest("build"))
    .pipe(bs.stream())
    cb()
}
function spyHTML(cb){
    gulp.watch("src/*.html", processHTML)
    cb()
}
function addIMG(cb){
    gulp.src("src/img/*")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"))
    .pipe(bs.stream())
    cb()
}
function spyIMG(cb){
    gulp.watch("src/img/*", addIMG)
    cb()
}
function removeBuild(cb){
    rimraf("build", cb)
}
function reload(cb){
    bs.init({
        server:{
            baseDir:"./build"
        }
    })
    cb()
}
function processJS(cb){
    gulp.src("src/js/*js")
    .pipe(gulp.dest("build"))
    .pipe(bs.stream())
    cb()
}
function spyJS(cb){
    gulp.watch("src/js/*js",processJS)
    cb()
}

function processFonts(cb){
    gulp.src("src/Font/*")
    .pipe(gulp.dest("build/Fonts"))
    .pipe(bs.stream())
    cb()
}
function spyFonts(cb){
    gulp.watch("src/Font/*",processFonts)
    cb()
}
exports.default = gulp.series( removeBuild,addIMG,processHTML,processCSS,processJS,processFonts,gulp.parallel(spyCSS,spyHTML,spyIMG,spyJS,spyFonts,reload));

