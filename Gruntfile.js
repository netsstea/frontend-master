'use strict';
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jsfiles: ['src/**/*.js'],
		stylefiles: ['src/**/*.css', 'src/**/*.sass', 'src/**/*.less', 'src/**/*.styl'],
		clean: {
			build: './build',
		},
		uglify: {
			all: {
				options: {
					compress: {
						drop_console: true,
					},
					banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
				},
				files: [{
					expand: true,
					cwd: './build/js',
					src: '**/*.js',
					dest: './build/js',
					ext: '.min.js'
				}],
			},
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: './src/css',
					src: ['*.css', '!*.min.css'],
					dest: './build/css',
					ext: '.min.css'
				}]
			}
		},
		browserify: {
			options: {
				transform: [
					'stringify',
				],
			},
			dev: {
				options: {
					watch: true,
					browserifyOptions: {
						debug: true,
					},
				},
				files: [{
					expand: true,
					cwd: './src/js',
					src: '**/*.js',
					dest: './build/js',
				}],
			},
			production: {
				options: {
					watch: false,
					browserifyOptions: {
						debug: false,
					},
				},
				files: [{
					expand: true,
					cwd: './src/js',
					src: '**/*.js',
					dest: './build/js',
				}],
			},
		},
		jscs: {
			all: {
				src: ['Gruntfile.js', '<%= jsfiles %>'],
				options: {
					config: './grunt/.jscsrc'
				}
			}
		},
		jshint: {
			all: {
				src: ['Gruntfile.js', '<%= jsfiles %>'],
				options: {
					jshintrc: './grunt/.jshintrc'
				},
			}
		},
		csslint: {
			all: {
				src: ['<%= stylefiles %>'],
				options: {
					csslintrc: './grunt/.csslintrc'
				},
			}
		},
		watch: {
			js: {
				files: ['Gruntfile.js', '<%= jsfiles %>'],
				tasks: ['jscs', 'jshint', 'browserify:dev']
			},
			style: {
				files: ['<%= stylefiles %>'],
				tasks: ['csslint', 'cssmin']
			}
		}
	});

	// Load the grunt plugins.
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jscs');

	// Default task(s).
	grunt.registerTask('default', ['clean:build', 'jscs', 'jshint', 'csslint', 'browserify:dev', 'cssmin', 'watch']);
	grunt.registerTask('production', ['clean:build', 'jscs', 'jshint', 'csslint', 'browserify:production', 'uglify', 'cssmin']);

};
