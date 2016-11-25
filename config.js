var src		= 'src';
var dest	= 'dest';

module.exports = {
	root: {
		src: "./" + src,
		dest: "./" + dest
	},
	tasks: {
		fonts: {
			src: "fonts",
			dest: "fonts",
			extensions: ["woff2", "woff", "eot", "ttf", "svg"]
		},
		images: {
			src: "images",
			dest: "images",
			extensions: ["jpg", "png", "svg", "gif", "jpeg"]
		},
		js: {
			src: "js",
			dest: "js",
			extensions: ["js", "json"]
		},
		css: {
			src: "css",
			dest: "css",
			autoprefixer: {
				browsers: ["last 3 version"],
				cascade: false
			},
			less: {
				src: "less/app.less"
			},
			extensions: ["less", "css"]
		},
		html: {
			src: "view",
			dest: "view",
			dataFile: "data.json",
			htmlmin: {
				collapseWhitespace: true
			},
			init: {
				src: "../index.html"
			},
			extensions: "html",
			excludeFolders: ["layouts", "shared", "macros", "data"]
		}
	},
	browsersync: {
		server: {
			baseDir: ['./']
		},
		port: 9000,
		files: [
			dest + '/css/**/*.css',
			dest + '/js/**/*.js',
			dest + '/images/**',
			dest + '/fonts/**/*',
			dest + '/**/*.html',
			'./index.html'
		]
	}
}
