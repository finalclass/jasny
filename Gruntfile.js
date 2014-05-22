module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    typescript: {
      base: {
        src: ['src/**/*.ts'],
        dest: 'src/',
        options: {
          module: 'commonjs',
          target: 'es5',
          basePath: 'src',
          sourceMap: false,
          declaration: false,
          atBegin: true
        }
      }
    },
    watch: {
      files: ['src/**/*.ts'],
      tasks: ['typescript']
    },
    clean: {
      js: ['src/**/*.js'],
      declarations: 'src/**/*.d.ts'
    }
  });

  grunt.loadNpmTasks('grunt-typescript');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['typescript']);
};

