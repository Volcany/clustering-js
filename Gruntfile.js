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
			listFolders: {
				options: {
					stdout: false
				},
				command: 'mocha --reporter xunit test/* > report/test-results.xml'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', ['jshint', 'shell']);
};