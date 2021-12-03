import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import gulp from "gulp";
import { task as execa } from "gulp-execa";
import cache from "gulp-cache";
import htmlmin from "gulp-html-minifier-terser";
import del from "del";

// use up-to-date imagemin plugins instead of those bundled with gulp-imagemin:
import imagemin from "gulp-imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminGifsicle from "imagemin-gifsicle";
import imageminSvgo from "imagemin-svgo";

// https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#what-do-i-use-instead-of-__dirname-and-__filename
const __dirname = path.dirname(fileURLToPath(import.meta.url));

gulp.task(
  "default",
  gulp.series(
    clean,
    npx("webpack", ["--mode", "production"]),
    npx("hugo", ["--verbose"]),
    gulp.parallel(optimizeHtml, optimizeImages)
  )
);

gulp.task(
  "serve",
  gulp.series(
    clean,
    gulp.parallel(
      npx("webpack", ["serve", "--mode", "development"]),
      npx("hugo", ["--watch", "--buildDrafts", "--buildFuture", "--verbose"])
    )
  )
);

gulp.task(
  "analyze",
  gulp.series(
    clean,
    npx("webpack", ["--mode", "production"]),
    npx("webpack-bundle-analyzer", [
      // https://github.com/webpack-contrib/webpack-bundle-analyzer#usage-as-a-cli-utility
      path.resolve(__dirname, "webpack_stats.json"), // path to webpack-generated JSON stats file
      path.resolve(__dirname, "static/assets/"), // path to finalized bundles
      "--mode",
      "server",
      "--default-sizes",
      "gzip",
    ])
  )
);

gulp.task("clean", clean);

function clean() {
  return del(["public/", "builds/", "_vendor/", "static/assets/", "webpack_stats.json"]);
}

function optimizeHtml() {
  return gulp
    .src("public/**/*.html", { base: "./" })
    .pipe(
      htmlmin({
        html5: true,
        preserveLineBreaks: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: false,
      })
    )
    .pipe(gulp.dest(".", { overwrite: true }));
}

function optimizeImages() {
  // allow skipping this step via an env variable to save time during CI, etc.
  if (process.env.SKIP_OPTIMIZE_IMAGES === "true") {
    console.warn("Skipping image optimization...");
    return Promise.resolve();
  }

  return gulp
    .src(["public/**/*.{gif,jpg,jpeg,png,svg}", "!public/assets/emoji/**/*"], { base: "./" })
    .pipe(
      cache(
        imagemin([
          imageminMozjpeg({
            quality: 85,
            progressive: true,
          }),
          imageminPngquant({
            quality: [0.7, 0.9],
            speed: 1,
            strip: true,
          }),
          imageminGifsicle(),
          imageminSvgo(),
        ])
      )
    )
    .pipe(gulp.dest(".", { overwrite: true }));
}

// run a locally installed (i.e. ./node_modules/.bin/foo) binary, similar to a package.json script
function npx(bin, args) {
  // WARNING: MAJOR HACKS AHEAD:
  const cmd = `${bin} ${args ? args.join(" ") : ""}`.trim();
  return execa(cmd, {
    echo: false,
    preferLocal: true,
    stdio: "inherit",
    killSignal: "SIGKILL", // graceful shutdown leaves webpack-dev-server dangling sometimes
  });
}
