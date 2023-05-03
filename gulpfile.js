const { src, dest, series, watch } = require("gulp");
const del = require("del");
const mergeStream = require("merge-stream");
const jsonModify = require("gulp-json-modify");
const _7z = require("7zip-min");

const version = require("./package.json").version;
const baseSourceFolder = "src/";
const baseOutputFolder = "build";

function clean() {
    return del(baseOutputFolder, {force: true});
}

function build() {
    const singleFiles = src(baseSourceFolder + "manifest.json")
        .pipe(jsonModify({
            key: "version",
            value: version
        }))
        .pipe(src(baseSourceFolder + "images/icon.svg"));

    const scripts = src(baseSourceFolder + "**/*.js");

    const directories = src([baseSourceFolder + "_locales/**/*"], {base: "./src/"});

    return mergeStream(singleFiles, scripts, directories)
        .pipe(dest(baseOutputFolder));
}

function package() {
    return new Promise((resolve, reject) => {
        _7z.pack(`./${baseOutputFolder}/*`, `${baseOutputFolder}/scroll-right-button_${version}.zip`, (err) => {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    });
}

function watchAllCodeFiles() {
    return watch([
        baseSourceFolder + "manifest.json",
        baseSourceFolder + "background-script.js",
    ], firefox);
}

const firefox = series(clean, build, package);
exports.firefox = firefox;

exports.watch = watchAllCodeFiles;

exports.default = firefox;
