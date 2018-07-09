// example https://pastebin.com/embed_iframe/faVj8bXA

var gulp         = require("gulp");
var gulpClean    = require("gulp-clean");
var gulpDebug    = require("gulp-debug");
var gulpZip      = require("gulp-zip");

var fs           = require("fs");
var childProcess = require("child_process")

let factorioDataFolder = process.env.APPDATA + "\\" + fs.readdirSync(process.env.APPDATA).filter(function(d) {return d.indexOf('Factorio') > -1}).join("/");
let factorioInstallFolder = "C:\\Program Files (x86)\\Steam\\steamapps\\common\\Factorio";
let modName, modVersion;



gulp.task("build_modinfo", () => {
  console.log("\n== Extracting mod info ==");

  let modInfo
  try {
    fs.accessSync("../info.json", fs.constants.R_OK | fs.constants.W_OK);
    modInfo = JSON.parse(fs.readFileSync("../info.json").toString());
  } catch (e) {
    throw new Error("The file [info.json] was not readable/writable or may not exist at all please run a map for more than 2 seconds after tab or create the file manually");
  }

  modName    = modInfo.name;
  modVersion = modInfo.version
    .split(".")
    .map((v) => {return parseInt(v);})
    .join(".");

  return new Promise(function(resolve, reject) {
    console.log("   Name    : " + modName    );
    console.log("   Version : " + modVersion );

    resolve();
  });
});



gulp.task("build_remove_old_build", () => {
  //console.log("\n== Removing old builds ==");

  return gulp.src(factorioDataFolder+"\\mods\\"+modName+"_*.zip", {read:false})
             .pipe(gulpDebug())
             .pipe(gulpClean({force:true}));
});



gulp.task("build_create_tmp_dir", () => {
  console.log("\n== Build mod ==")

  return gulp.src(["../**/*",
                   "!../**/.*",
                   "!../{build,build/**}",
    ],  {base: '..'})
    .pipe(gulpDebug())
    .pipe(gulp.dest("tmp/"+modName+"_"+modVersion));
});



gulp.task("build_remove_tmp_dir", () => {
  console.log("\n== Build cleanup ==")

  return gulp.src("tmp/"+modName+"_"+modVersion+"/", {read:false})
             .pipe(gulpClean());
});



gulp.task("build_create_zip", () => {
  console.log("\n== Creating zip file ==")

  return gulp.src("tmp/**/*")
             .pipe(gulpZip(modName+"_"+modVersion+".zip"))
             //.pipe(gulpDebug())
             .pipe(gulp.dest(factorioDataFolder+"/mods/"))
             .pipe(gulpDebug())
});



// Task building the zip file
gulp.task("build_process", gulp.series(
  gulp.parallel(
    "build_remove_old_build",
    "build_modinfo",
  ),
  "build_create_tmp_dir",
  "build_create_zip",
  "build_remove_tmp_dir"
));



gulp.task("launch_factorio", () => {
    console.log("\n== Starting Factorio ==");
    return childProcess.spawn(factorioInstallFolder+"/bin/x64/factorio.exe", [], { stdio: 'inherit' });
});



// Main program
gulp.task("main", gulp.series(
  "build_process",
  "launch_factorio"
));
