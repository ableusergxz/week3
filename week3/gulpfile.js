var gulp = require("gulp");
var uglify = require("gulp-uglify"); //压缩文件
var rename = require("gulp-rename"); //重命名
var concat = require("gulp-concat"); //文件合并
var minifyCss = require("gulp-minify-css"); //压缩css
var less = require("gulp-less"); //编译less
var minifyHtml = require("gulp-minify-html"); //压缩html
var imagemin = require("gulp-imagemin"); //压缩图片
var connect = require("gulp-connect");
var usemin = require("gulp-usemin");
var rev = require("gulp-rev");
var browserSync = require('browser-sync');
var mock = require('./mock')

gulp.task("less", function() {
    gulp.src("./src/static/less/*.less")
        .pipe(less())
        .pipe(gulp.dest("./src/static/css"))
        .pipe(connect.reload())
})
gulp.task("mergreLib", function() {
    gulp.src("./src/static/lib/*.js")
        .pipe(concat("lib.js"))
        .pipe(gulp.dest("./src/static/lib/build/"))
})

gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: "./src",
            index: "static/index.html",
            middleware: function(req, res, next) {
                console.log(req.url);
                if (/\/api/g.test(req.url)) {
                    res.end(JSON.stringify(
                        mock(req.url)
                    ));
                }
                next();
            }
        },
        files: ["src"],
        port: 1122
    });
});
gulp.task("moveLib", function() {
    gulp.src("./src/static/lib/build/lib.js")
        .pipe(gulp.dest("./dist/static/lib/build"))
})
gulp.task("moveimages", function() {
    gulp.src("./src/static/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./dist/static/images/"))
})
gulp.task("build", ["moveLib"], function() {
    gulp.src('./src/*.html')
        .pipe(usemin({
            js: [uglify, rev],
            css: [minifyCss],
            html: [function() { return minifyHtml() }]
        }))
        .pipe(gulp.dest('./dist/'));
})
gulp.task('watch', function() {
    gulp.watch(['./src/static/js/*.js', './src/*.html'], function() {
        gulp.watch("./src/*.html")
            .pipe(connect.reload())
    })
    gulp.watch('./src/static/less/*.less', ["less"])
})
gulp.task("default", ["less", "mergreLib", "server", "watch"])