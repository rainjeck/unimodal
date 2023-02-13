var gulp = require("gulp");
var plugin = require("gulp-load-plugins")();
var browserSync = require("browser-sync").create();

var pluginName = 'unimodal';

gulp.task("js", function() {
  return (
    gulp
    .src(["./src/Unimodal.js"])
    .pipe(plugin.sourcemaps.init())
    .pipe(
      plugin.babel({
        presets: [
          ['@babel/preset-env']
        ],
        plugins: [
          "@babel/plugin-proposal-class-properties"
        ],
      }, ).on("error",
        plugin.notify.onError("*** JS ***: <%= error.message %>")
      )
    )
      .pipe(plugin.umd())
    .pipe(plugin.rename({
      basename: pluginName.toLowerCase()
    }))
    .pipe(plugin.sourcemaps.write("../dest"))
    .pipe(plugin.headerComment(`
      License: <%= pkg.license %>
      Description: <%= pkg.description %>
      Author: <%= (pkg.author) %>
      Homepage: <%= pkg.homepage %>
    `))
    .pipe(gulp.dest("./dest"))
  );
});

gulp.task("js-minify", function() {
  return (
    gulp
    .src(["dest/" + pluginName.toLowerCase() + ".js"])
    .pipe(plugin.jsmin())
    .pipe(plugin.rename({
      suffix: '.min'
    }))
    .pipe(plugin.headerComment(`
      License: <%= pkg.license %>
      Description: <%= pkg.description %>
      Author: <%= (pkg.author) %>
      Homepage: <%= pkg.homepage %>
    `))
    .pipe(gulp.dest("./dest"))
  );
});

gulp.task("styl", function() {
  return (
    gulp
    .src(["./src/*.styl"])
    .pipe(
      plugin.stylus().on("error",
        plugin.notify.onError("*** STYLUS ***: <%= error.message %>")
      )
    )
    .pipe(
      plugin.autoprefixer({
        remove: false,
        cascade: false
      })
    )
    .pipe(plugin.rename({
      basename: pluginName.toLowerCase()
    }))
    .pipe(gulp.dest("./dest"))
  );
});

gulp.task("styl-minify", function() {
  return (
    gulp
    .src(["dest/" + pluginName.toLowerCase() + ".css"])
    .pipe(plugin.cleanCss())
    .pipe(plugin.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest("./dest"))
  );
});

gulp.task("css", function() {
  return (
    gulp
    .src(["./demo/src/*.styl"])
    .pipe(
      plugin.stylus().on("error",
        plugin.notify.onError("*** STYLUS ***: <%= error.message %>")
      )
    )
    .pipe(
      plugin.autoprefixer({
        remove: false,
        cascade: false
      })
    )
    .pipe(gulp.dest("./demo"))
  );
});

gulp.task("pug", function() {
  return gulp
    .src(["./demo/src/*.pug"])
    .pipe(
      plugin.pug({
        pretty: true
      })
    )
    .on("error", plugin.notify.onError("*** PUG ***: <%= error.message %>"))
    .pipe(gulp.dest("./"))
});

// --- WATCHER
gulp.task("watcher", function(done) {
  browserSync.reload("/");
  done();
});


// Watch
gulp.task("watch", function() {

  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: false,
    ghostMode: false,
    logFileChanges: false,
    localOnly: true,
    timestamps: false
  });

  gulp.watch("./src/*.js", gulp.series("js", "js-minify", "watcher"));

  gulp.watch("./src/*.styl", gulp.series("styl", "styl-minify", "watcher"));

  gulp.watch("./demo/*.js", gulp.series("watcher"));

  gulp.watch("./demo/src/*.styl", gulp.series("css", "watcher"));

  gulp.watch("./demo/src/*.pug", gulp.series("pug", "watcher"));
});

gulp.task("build",
  gulp.series(
    "js",
    "js-minify",
    "styl",
    "styl-minify",
    "css",
    "pug"
  ),
  function(done) {
    done();
  }
);

gulp.task("default",
  gulp.series(
    "js",
    "js-minify",
    "styl",
    "styl-minify",
    "css",
    "pug",
    "watch"
  ),
  function(done) {
    done();
  }
);
