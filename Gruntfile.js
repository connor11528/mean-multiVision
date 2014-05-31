'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    base: {
      // configurable paths
      path: require('./bower.json').appPath || 'public'
    },

    // TODO: compile LESS into CSS (change/update style variables easily)
    less: {
      options: {
        paths: ["<%= base.path %>/stylesheets"]
      },
      src: {
          // no need for files, the config below should work
          expand: true,
          cwd:    "<%= base.path %>/stylesheets",
          src:    "*.less",
          ext:    ".css"
      }
    }

  });

  grunt.registerTask('build', ['less']);

  grunt.registerTask('default', [
    'build'
  ]);
};
