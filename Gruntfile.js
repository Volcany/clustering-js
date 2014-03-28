module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			files: ['lib/**/*.js'],
			options: {
				maxlen: 80,
				quotmark: 'single'
			}
		},
		simplemocha: {
			options: {
			  globals: ['should'],
			  timeout: 3000,
			  ignoreLeaks: false,
			  ui: 'bdd',
			  reporter: 'list'
			},

			all: { src: ['test/**/*.js'] }
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');


	grunt.registerTask('default', ['jshint', 'simplemocha']);
};