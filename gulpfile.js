const gulp = require('gulp'),
    gulpif = require('gulp-if'),
    del = require('del'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    notify = require("gulp-notify"),
    webpackstream = require('webpack-stream'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    postcss = require('gulp-postcss'),
    short = require('postcss-short'),
    assets = require('postcss-assets'),
    cssnano = require('cssnano'),
    autoprefixer = require('autoprefixer'),
    postcssPresetEnv = require('postcss-preset-env'),
    mqpacker = require('css-mqpacker'),
    sortCSSmq = require('sort-css-media-queries'),
    postcssStripUnits = require('postcss-strip-units'),
    webpack = require('webpack'),
    path = require('path');

isDev = true;
isProd = !isDev;

let webpackConfig = {
    // entry是入口文件，可以多个，代表要编译那些js
    //entry:['./src/main.js','./src/login.js','./src/reg.js'],
    entry: {
        'index': './src/index.js',
        'index2': ['./src/index2.js']
    },
    output: {
        //path: path.resolve("src/", "/dist/js"),
        //filename: 'bundle.js'
        filename: '[name].js'
    },
    // plugins:[     
    //     // 拆分插件
    //     new webpack.optimize.CommonsChunkPlugin({
    //      name:'user', // 上面入口定义的节点组
    //      filename:'build-user.js' //最后生成的文件名
    //     }),
    // ],
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
            test: /\.(js|ts)$/,
            loader: 'babel-loader',
            exclude: '/node_modules/'
        }]
    },
    mode: isDev ? 'development' : 'production',
    devtool: isProd ? false : 'cheap-module-eval-source-map'
}

function styles() {
    return gulp.src('src/scss/*.scss')
        .pipe(gulpif(isDev, sourcemaps.init()))
        .pipe(sass().on("error", notify.onError()))
        .pipe(postcss([postcssPresetEnv]))
        .pipe(postcss([short]))
        .pipe(postcss([assets({
            loadPaths: ['dist/assets/fonts/**/*', 'dist/assets/img/'],
            relativeTo: 'dist/css/'
        })]).on("error", notify.onError()))
        .pipe(postcss([postcssStripUnits]))
        .pipe(gulpif(isProd, postcss([autoprefixer(['> 1%', 'last 2 versions', 'not IE 8'])])))
        .pipe(gulpif(isProd, postcss([mqpacker({
            sort: sortCSSmq
        })])))
        .pipe(gulpif(isProd, postcss([cssnano()])))
        //.pipe(rename('bundle.css'))
        .pipe(gulpif(isProd, rename(function (path) {
            path.extname = ".min.css"
        })))
        .pipe(gulpif(isDev, sourcemaps.write()))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('src/*.js')
        .pipe(plumber())
        .pipe(webpackstream(webpackConfig).on("error", notify.onError()))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
}

function browser() {
    browserSync({
        server: {
            baseDir: 'dist'
        },
        // proxy: 'gulp',
        notify: false,
        open: true,
        // online: false, // Work Offline Without Internet Connection
        // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
    })
}

function clean(end) {
    del(['dist/*', '!dist/assets']);
    end();
}

function html() {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function php() {
    return gulp.src('src/**/*.php')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
}

function watch() {
    gulp.watch('./src/scss/**/*.scss', styles);
    gulp.watch('./src/**/*.js', scripts);
    gulp.watch('./src/**/*.ts', scripts);
    gulp.watch('./src/**/*.html', html);
}

module.exports.clean = clean;

gulp.task('watch', gulp.parallel(browser, watch));
gulp.task('build', gulp.series(clean, gulp.parallel(html, styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
gulp.task('default', gulp.series('dev'));