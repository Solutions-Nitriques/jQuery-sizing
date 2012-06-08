/*global module:false*/
module.exports = function(grunt) {

	"use strict";
	
	// Project configuration.
	grunt.initConfig({
		pkg: '<json:package.json>',
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
		},
		min: {
			dist: {
			src: ['<banner:meta.banner>', 'src/jquery.*.js'],
			dest: 'dist/<%= pkg.name %>.min.js'
			}
		},
		qunit: {
			files: ['http://localhost:8080/tests/jquery.sizing.js.test.html?noglobals=true',
				'http://localhost:8080/tests/jquery.sizing.js.test.html?noglobals=true&jquery=1.7',
				'http://localhost:8080/tests/jquery.sizing.js.test.html?noglobals=true&jquery=1.6',
				'http://localhost:8080/tests/jquery.sizing.js.test.html?noglobals=true&jquery=1.5',
				'http://localhost:8080/tests/jquery.sizing.js.test.html?noglobals=true&jquery=1.4',
				'http://localhost:8080/tests/jquery.sizing.js.test.html?noglobals=true&jquery=1.3']
		},
		lint: {
			files: ['grunt.js', 'src/jquery.*.js']
		},
		/*watch: {
			files: '<config:lint.files>',
			tasks: 'lint qunit'
		},*/
		jshint: {
			options: {
c
			},
			globals: {
				jQuery: true,
				console: true
			}
		},
		uglify: {},
		server: {
			port: 8080,
			base: '.'
		}
	});

	// Default task.
	grunt.registerTask('default', 'lint server qunit min');

};