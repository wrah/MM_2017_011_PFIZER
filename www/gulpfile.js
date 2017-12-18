var gulp = require('gulp');
var compass = require('gulp-compass');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var debug = require('gulp-debug');
var argv = require("yargs").argv;

var buildStyles = function(directory, cb)
{
	if (! directory)
	{
		directory = "web/css";
	}
	
	if (! cb)
	{
		cb = function() {};
	}

	return gulp.src("assets/sass/**/*.scss")
		.pipe(debug({"title": "styles"}))
		.pipe(plumber())
		.pipe(
			compass({
				"config_file": "./config.rb",
				"css": directory,
				"sass": "assets/sass"
			})
			.on("error", cb)
		)
		.pipe(gulp.dest(directory))
	;
};

//styles
gulp.task("styles", function(cb) {
	return buildStyles("web/css", cb);
});



//scripts
var buildScripts = function(directory)
{
	if (! directory)
	{
		directory = "web/js";
	}

	return gulp.src("assets/js/**/*.js")
		.pipe(debug({"title": "scripts"}))
		.pipe(plumber())
		.pipe(gulp.dest(directory))
	;
};

gulp.task("scripts", function() {
	return buildScripts("web/js");
});

//pdf
var buildRules = function(directory)
{
	if (! directory)
	{
		directory = "web/pdf";
	}

	return gulp.src("assets/pdf/**/*.pdf")
		.pipe(debug({"title": "pdf"}))
		.pipe(plumber())
		.pipe(gulp.dest(directory))
	;
};

gulp.task("pdf", function() {
	return buildRules("web/pdf");
});


//images
var buildImages = function(directory)
{
	if (! directory)
	{
		directory = "web/images";
	}

	return gulp.src("assets/images/**/*.{jpg,jpeg,png,gif}")
		.pipe(debug({"title": "images"}))
		.pipe(plumber())
		.pipe(gulp.dest(directory))
	;
};

gulp.task("images", function() {
	return buildImages("web/images")
});

//fonts
var buildFonts = function(directory)
{
	if (! directory)
	{
		directory = "web/fonts";
	}

	return gulp.src("assets/fonts/**/*.{svg,ttf,eot,woff}")
		.pipe(debug({"title": "fonts"}))
		.pipe(plumber())
		.pipe(gulp.dest(directory))
	;
};
gulp.task("fonts", function() {
	return buildFonts("web/fonts")
});

//templates
gulp.task("twig", function() {
	return gulp.src('templates/**/*.html.twig')
		.pipe(debug({title: 'twig:'}))
		.pipe(plumber());
});

gulp.task("default", ["styles", "scripts", "pdf", "twig", "images", "fonts"]);

gulp.task("watch", ["scripts", "styles"], function() {
	gulp.watch("assets/sass/**/*.scss", ["styles"]);
	gulp.watch("assets/js/**/*.js", ["scripts"]);
	gulp.watch("assets/pdf/**/*.pdf", ["pdf"]);
	gulp.watch("templates/**/*.html.twig", ["twig"]);
	gulp.watch("assets/fonts/**/*.{jsvg,ttf,eot,woff}", ["fonts"]);
	gulp.watch("assets/images/**/*.{jpg,jpeg,png,gif}", ["images"]);
});

gulp.task("freeze", function() {
	var rootDirectory = "build";

	if (argv.directory)
	{
		rootDirectory = argv.directory;
	}

	buildStyles(rootDirectory + "/css");
	buildScripts(rootDirectory + "/js");
	buildRules(rootDirectory + "/pdf");
	buildImages(rootDirectory + "/images");
	buildFonts(rootDirectory + "/fonts");
});
