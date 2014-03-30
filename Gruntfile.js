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
		shell: {
			mochaTest: {
				options: {
					stdout: false
				},
				command: 'mocha --reporter xunit test/* > report/test-results.xml'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-bump');

	grunt.registerTask('default', ['jshint', 'shell']);
};