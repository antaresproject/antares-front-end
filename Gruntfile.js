let intro = `
  █████╗ ███╗   ██╗████████╗ █████╗ ██████╗ ███████╗███████╗
 ██╔══██╗████╗  ██║╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██╔════╝
 ███████║██╔██╗ ██║   ██║   ███████║██████╔╝█████╗  ███████╗
 ██╔══██║██║╚██╗██║   ██║   ██╔══██║██╔══██╗██╔══╝  ╚════██║
 ██║  ██║██║ ╚████║   ██║   ██║  ██║██║  ██║███████╗███████║
 ╚═╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝                                                                                                                                                                                                                          
`;
console.log(intro);

const myTemplate = '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */';
module.exports = function(grunt) {
  grunt.initConfig({
    //  __   __   __   ___
    // /  ` /  \ |__) |__

    // \__, \__/ |  \ |___

    pkg: grunt.file.readJSON('package.json'),
    import: {
      options: {},
      dist: {
        src: '_src/intro.js',
        dest: 'dist/intro.js'
      }
    },
    clean: {
      build: {
        src: ['_dist/*']
      }
    },
    watch: {
      options: {
        // livereload: true
      },
      css: {
        files: ['_src/less/**/*.less'],
        // tasks: ['less', 'uncss', 'cssmin']
        tasks: ['stylesDev']
      }
    },
    //  __  ___           ___  __
    // /__`  |  \ / |    |__  /__`
    // .__/  |   |  |___ |___ .__/
    less: {
      dev: {
        options: {
          sourceMap: true,
          sourceMapFileInline: false,
          banner: myTemplate
        },
        files: {
          '_dist/css/antares.css': '_src/less/codeflow.less',
          '_dist/css/external.css': '_src/less/external.less',
          '_dist/css/defer.css': '_src/less/defer.less'
        }
      },
      prod: {
        options: {
          sourceMap: false,
          banner: myTemplate
        },
        files: {
          '_dist/css/antares.css': '_src/less/codeflow.less',
          '_dist/css/external.css': '_src/less/external.less',
          '_dist/css/defer.css': '_src/less/defer.less'
        }
      }
    },
    postcss: {
      dev: {
        options: {
          map: false,
          processors: [
            require('autoprefixer')({
              browsers: ['last 6 versions']
            }),
            require('postcss-discard-comments'),
            require('postcss-zindex'),
            require('postcss-merge-rules'),
            require('css-declaration-sorter')({
              order: 'smacss'
            })
          ]
        },
        src: ['_dist/css/antares.css', '_dist/css/external.css', '_dist/css/defer.css']
      },
      prod: {
        options: {
          map: false,
          processors: [
            require('autoprefixer')({
              browsers: ['last 6 versions']
            }),
            // disable comments
            require('postcss-discard-comments'),
            require('postcss-zindex'),
            // //merge same rules
            require('postcss-merge-rules'),
            // //sort
            require('css-declaration-sorter')({
              order: 'smacss'
            }),
            // join media querries
            require('css-mqpacker'),

            require('postcss-unique-selectors'),
            require('postcss-discard-unused'),
            require('postcss-discard-empty'),
            require('postcss-discard-duplicates'),
            // need config in future
            // require("stylelint")(),
            require('cssnano')({
              discardUnused: { fontFace: false }
            })
          ]
        },

        src: ['_dist/css/antares.css', '_dist/css/external.css', '_dist/css/defer.css']
      }
    }
  });

  //
  // MAIN
  //

  grunt.registerTask('default', [], () => {
    grunt.task.run('styles-clean-dev');
  });

  grunt.registerTask('watch', [], () => {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.task.run('watch');
  });

  // STYLES
  grunt.registerTask('stylesDev', [], () => {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.task.run('less:dev', 'postcss:dev');
  });
  grunt.registerTask('stylesProd', [], () => {
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.task.run('less:prod', 'postcss:prod');
  });

  // STYLES with dist clean
  grunt.registerTask('styles-clean-dev', [], () => {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.task.run('clean', 'stylesDev');
  });
  grunt.registerTask('styles-clean-prod', [], () => {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.task.run('clean', 'stylesProd');
  });
};
