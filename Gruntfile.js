module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['./public/client/app.js',
              './public/client/link.js',
              './public/client/links.js',
              './public/client/linkView.js',
              './public/client/linksView.js',
              './public/client/createLinkView.js',
              './public/client/router.js'],
        dest: 'public/dist/client.js'
      },
      disto: {
        src: ['./public/lib/jquery.js', './public/lib/underscore.js', './public/lib/backbone.js', './public/lib/handlebars.js'],
        dest: 'public/dist/lib.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      tar1: {
        files: {
          './public/dist/client.min.js': ['./public/dist/client.js']
        }
      },
      tar2: {
        files: {
          './public/dist/lib.min.js': ['public/dist/lib.js']
        }
      }
    },

    eslint: {
      target: [
        // Add list of files to lint here
        './public/client/*.js',
        './app/collections/*.js',
        './app/models/*.js',
      ]
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: './public/',
          src: './style.css',
          dest: './public/dist/',
          ext: '.min.css'
        }]
      }
    },

    clean: ['./public/dist/lib.js', './public/dist/client.js'],


    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
      },
      livePush: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  // grunt.registerTask('nodemon', ['nodemon']);

  grunt.registerTask('livePush', ['shell:livePush']);


  grunt.registerTask('test', [
    'mochaTest'
  ]);


  grunt.registerTask('build', [
    'eslint',
    'test',
    'concat',
    'uglify',
    'cssmin',
    'clean',
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
      grunt.task.run(['livePush', 'server-dev']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    'build',
    'upload'
  ]);
};
