module.exports = function(grunt) {

    require('time-grunt')(grunt);

    grunt.initConfig({

        //  __   __   __   ___ 
        // /  ` /  \ |__) |__  
        // \__, \__/ |  \ |___ 

        pkg: grunt.file.readJSON('package.json'),
        newer: {
          options: {
            tolerance: 1000
          }
        },
        wiredep: {

            all: {
                src: ['_src/*.html', '_dist/*.html']
            }
        },
        clean: {
            build: {
                src: ['_dist/*', 'bulid_area/*', '_dist/*']
            }
        },
        watch: {
            options: {
                // livereload: true
            },
            css: {
                files: ['_src/less/**/*.less'],
                // tasks: ['less', 'uncss', 'cssmin']
                tasks: ['styles']
            },

        },

        // ___  ___        __            ___  ___ 
        //  |  |__   |\/| |__) |     /\   |  |__  
        //  |  |___  |  | |    |___ /~~\  |  |___ 

        htmlbuild: {
            dist: {
                src: '_src/*.html',
                dest: 'bulid_area/html/',
                options: {
                    beautify: false,
                    sections: {
                        antaresPreloader: '_src/templates/antares_preloader.html',
                        sidebar: '_src/templates/sidebar.html',
                        mainhead: '_src/templates/mainhead.html',
                        colortemplate: '_src/templates/colortemplate.html',
                        assetsJS: '_src/templates/assetsJS.html',
                        assetsCSS: '_src/templates/assetsCSS.html',
                        widgetsEdit: '_src/templates/widgets-edit.html',
                        coreJS: '_src/templates/coreJS.html',
                        sidebarNotifications: '_src/templates/sidebar-notifications.html',
                        preloader: '_src/templates/preloader.html',
                        vueAntares: '_src/templates/vue_antares.html',
                        tableSample: '_src/templates/table_sample.html',
                        //email
                        emailHead: '_src/templates/email/header.html',
                        emailStyles: '_src/templates/email/styles.html',
                        emailFooter: '_src/templates/email/footer.html',
                        //pattern-lib
                        patLibButton: '_src/templates/pattern-lib/button.html',
                        patLibButtonColors: '_src/templates/pattern-lib/button_colors.html',
                        patLibButtonLink: '_src/templates/pattern-lib/button_link.html',
                        patLibButtonLinkColors: '_src/templates/pattern-lib/button_link_colors.html',
                        patLibSelect: '_src/templates/pattern-lib/select.html',
                        patLibSelectSearch: '_src/templates/pattern-lib/select_search.html',
                        patLibSelectMultiple: '_src/templates/pattern-lib/select_multiple.html',
                        patLibSelectMDL: '_src/templates/pattern-lib/select_MDL.html',
                        patLibSelectFlag: '_src/templates/pattern-lib/select_flag.html',
                        patLibSelectOptGroup: '_src/templates/pattern-lib/select_optgroup.html',
                        patLibSelectPrefix: '_src/templates/pattern-lib/select_prefix.html',
                        patLibSelectCustom: '_src/templates/pattern-lib/select_custom.html',
                        patLibSelectCustomJS: '_src/templates/pattern-lib/select_custom_js.html',
                        patLibRadioButtons: '_src/templates/pattern-lib/radio_buttons.html',
                        patLibRadioButtonsImage: '_src/templates/pattern-lib/radio_buttons_bg_image.html',
                        patLibFormsInputs: '_src/templates/pattern-lib/forms_inputs.html',
                        patLibFormsUpload: '_src/templates/pattern-lib/forms_upload.html',
                        patLibFormsDate: '_src/templates/pattern-lib/forms_date.html',
                        patLibFormsGroups: '_src/templates/pattern-lib/forms_groups.html',
                        patLibFormsInputButtons: '_src/templates/pattern-lib/forms_inputs_with_buttons.html',
                        patLibDatepickerJS: '_src/templates/pattern-lib/datepickerJS.html',
                        patLibSearchBox: '_src/templates/pattern-lib/search_box.html',
                        patLibSearchBoxWithClose: '_src/templates/pattern-lib/search_box_with_close.html',

                    },

                    // data: {
                    //     // Data to pass to templates
                    //     version: "0.6",
                    //     title: "test",
                    // },
                }
            }
        },
        // Minification & Remove What Is Not Needed
        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: true,
                },
                files: [{
                    expand: true,
                    cwd: 'bulid_area/html',
                    ext: '.html',
                    src: '*.html',
                    overwrite: true,
                    dest: '_dist'
                }]
            },
        },

        //formatitng

        prettify: {
            options: {
                "indent": 2,
                "indent_char": " ",
                "indent_scripts": "normal",
                "wrap_line_length": 0,
                "brace_style": "collapse",
                "preserve_newlines": false,
                "max_preserve_newlines": 1,
                // "unformatted": [
                //   "a",
                //   "code",
                //   "pre"
                // ]
            },
            files: {
                expand: true,
                cwd: 'bulid_area/html/',
                ext: '.html',
                src: ['*.html'],
                overwrite: true,
                dest: '_dist/'
            }
        },
        copy: {
            manifest: {
                expand: true,
                cwd: '_src/templates/layout/',
                src: ['manifest.json'],
                dest: '_dist/',
            },
            fonts: {
                expand: true,
                cwd: '_src/fonts/',
                src: ['**'],
                dest: '_dist/fonts/',
            },
            img: {
                expand: true,
                cwd: '_src/img/',
                src: ['**'],
                dest: '_dist/img/',
            },
        },
        //  __  ___           ___  __  
        // /__`  |  \ / |    |__  /__` 
        // .__/  |   |  |___ |___ .__/ 
        less: {
            main: {
                options: {
                    sourceMap: false,
                    sourceMapFileInline: false,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    '_src/css/codeflow.css': '_src/less/codeflow.less'
                }
            },
            external: {
                options: {
                    sourceMap: false,
                    sourceMapFileInline: false,
                    // banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'
                },
                files: {
                    '_src/css/external.css': '_src/less/external.less'
                }
            }
        },
        postcss: {
            options: {
                // map: {
                //     inline: false, // save all sourcemaps as separate files...
                //     // annotation: 'dist/css/maps/' // ...to the specified directory
                //     prev: '_src/css/',
                // },
                processors: [
                    // require('pixrem')(), // add fallbacks for rem units

                    require('rucksack-css'),
                    // add vendor prefixes
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

                    //join media querries
                    require('css-mqpacker'),

                    require('postcss-unique-selectors'),
                    require('postcss-discard-unused'),
                    require('postcss-discard-empty'),
                    require('postcss-discard-duplicates'),

                    // need config in future
                    // require("stylelint")(),

                    require('cssnano')({
                        discardUnused: {fontFace: false}
                    }),

                ],
            },
            main: {
                src: '_src/css/codeflow.css',
                dest: '_dist/css/antares.css'
            },
            framework: {
                src: '_src/css/antares_framework.css',
                dest: '_dist/css/antares_framework.css'
            },
            login: {
                src: '_src/css/login.css',
                dest: '_dist/css/login.css'
            },
            bower_assets: {
                src: '_src/css/bower_assets.css',
                dest: '_dist/css/bower_assets.css'
            },
            external: {
                src: '_src/css/external.css',
                dest: '_dist/css/external.css'
            }
        },
        uncss: {
            dist: {
                options: {
                    // ignore: ['.btnss']
                },
                files: {
                    '_dist/css/client-details.css': ['_dist/clients-details.html']
                }
            }

        },
        lesslint: {
            src: ['_src/less/codeflow.less'],
            options: {
                failOnWarning: false,
            }
        },


        //       __  
        //    | /__` 
        // \__/ .__/ 

        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                ignores: ['_src/js/bower_assets.js']
            },
            target: ['Gruntfile.js'],
        },
        bower_concat: {
            all: {
                dest: {
                    // 'js': '_src/js/external/bower_assets.js',
                    'css': '_src/css/bower_assets.css'
                },
            }
        },
        compress: {
            js: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '_dist/js',
                src: ['**/*'],
                dest: '_dist/js/_gzip/',
                ext: '.gz.js',
                extDot: 'last'
            },
            css: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '_dist/css',
                src: ['*.css'],
                dest: '_dist/css/_gzip/',
                ext: '.gz.css',
                extDot: 'last'
            },
            html: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: '_dist/',
                src: ['*.html'],
                dest: '_dist/gzip_html/',
                ext: '.gz.html',
                extDot: 'last'
            },
            assets: {
                options: {
                    mode: 'gzip'
                },
                expand: true,
                cwd: 'assets',
                src: ['**/*'],
                dest: 'gzip_assets/',
                ext: '.js.gz',
                extDot: 'last'
            },
        },

        gzip: {
            options: { detail: true },
            css: {
                src: [
                    '_dist/css/*.css',
                ],
                dest: '_dist/css/_gzip',

            },
        },

        //instead of js copy - remove comments and beautify
        uglify: {
            options: {
                mangle: false,
                beautify: false,
                screwIE8: true,
                report: 'gzip',
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */'

            },
            core: {
                files: [{
                    expand: true,
                    cwd: '_src/js',
                    src: ['**/*.js', '!external/*.js', '!require/**/*.js', '!external/codemirror/**/*.js'],
                    dest: '_dist/js'
                }]
            },
            external: {
                files: [{
                    expand: true,
                    cwd: '_src/js',
                    src: ['external/*.js', '!external/bower_assets.js', '!external/all.js', '!external/codemirror/**/*.js'],
                    dest: '_dist/js'
                }]
            }
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['_src/js/external/bower_assets.js', '_src/js/external/all.js', '_src/js/external/material.min.js'],
                dest: '_src/js/external/antares_assets.js',
            },
        },
        bowerRequirejs: {
            target: {
                rjsConfig: '_src/js/require/main.js'
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '_src/js/require',
                    mainConfigFile: '_src/js/require/main.js',

                    include: ['require.js', 'main.js', 'rest.js', 'antares.js', 'gridstackAssets', 'formsAssets'],
                    out: '_dist/js/rjso.js'
                }
            }
        },
        umd: {
            all: {
                options: {
                    src: ['_dist/js/**/*.js', '!_dist/js/require/*.js', '!_dist/js/vue/*.js', '!_dist/js/external/codemirror/*.js'],
                    // dest: 'path/to/output.js', // optional, if missing the src will be used
                    template: 'umd', 
                }
            }
        },
        //REST
        pagespeed: {
            options: {
                nokey: true,
                url: "https://developers.google.com"
            },
            prod: {
                options: {
                    // url: "http://dev.tehaiks.net/_mg/billevo-dev/_dist/",
                    url: "http://serwer16072.lh.pl/x02b/forms.html",
                    locale: "en_GB",
                    strategy: "desktop",
                    threshold: 75
                }
            },
        },
        cachebreaker: {
            dev: {
                options: {
                    match: ['.js', '.css'],
                },
                files: {
                    src: ['_dist/*.html']
                }
            }
        },
        image: {
          dynamic: {
            options: {
              pngquant: true,
              optipng: false,
              zopflipng: false,
              jpegRecompress: false,
              jpegoptim: true,
              mozjpeg: true,
              gifsicle: true,
              svgo: true
            },
            files: [{
              expand: true,
              cwd: '_src/',
              src: ['img/**/*.{png,jpg,gif,svg}'],
              dest: '_dist/'
            }]
          }
        },
        imagemin: { // Task
            dynamic: { // Another target
                  options: {                       // Target options
                    optimizationLevel: 6,
                    svgoPlugins: [{ removeViewBox: false }],
                  },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: '_src/', // Src matches are relative to this path
                    src: ['img/**/*.{png,jpg,gif,svg}'], // Actual patterns to match
                    dest: '_dist/' // Destination path prefix
                }]
            }
        },

        phantomas: {
            gruntSite: {
                options: {
                    indexPath: './phantomas/',
                    options: {},
                    url: 'http://serwer16072.lh.pl/x03b/index.html',
                    buildUi: true
                }
            }
        },

    });


    //
    // MAIN
    //


    // AKA - GRUNNT FULL REBULID
    grunt.registerTask('default', [], function() {
        grunt.task.run('tools', 'template', 'bower', 'styles');
    });

    grunt.registerTask('qck', [], function() {
        grunt.task.run('tools', 'template', 'bower', 'styles', 'js');
    });




    // STYLES

    grunt.registerTask('styles', [], function() {
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-postcss');
        // grunt.loadNpmTasks('grunt-lesslint');
        grunt.task.run('less:main', 'less:external', 'postcss:main', 'postcss:external', 'postcss:bower_assets');
        // grunt.task.run('less:main','postcss:main');
    });

    grunt.registerTask('styles-newer', [], function() {
        grunt.loadNpmTasks('grunt-newer');
        grunt.loadNpmTasks('grunt-contrib-less');
        grunt.loadNpmTasks('grunt-postcss');
        // grunt.loadNpmTasks('grunt-lesslint');
        grunt.task.run('less:main', 'less:external', 'newer:postcss:main', 'newer:postcss:external', 'newer:postcss:bower_assets');
    });

    // JS

    grunt.registerTask('js', [], function() {
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        // grunt.loadNpmTasks('grunt-contrib-compress');

        // grunt.loadNpmTasks('grunt-umd');
        grunt.task.run('concat', 'uglify');
    });

    grunt.registerTask('js-core', [], function() {
        // grunt.loadNpmTasks('grunt-contrib-jshint');
        // grunt.loadNpmTasks('grunt-contrib-copy');
        // grunt.loadNpmTasks('grunt-stripcomments');
        // grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.task.run('uglify:core');
    });

    grunt.registerTask('js-core-newer', [], function() {
        grunt.loadNpmTasks('grunt-contrib-jshint');
        // grunt.loadNpmTasks('grunt-contrib-copy');
        // grunt.loadNpmTasks('grunt-stripcomments');
        // grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-newer');
        grunt.task.run('newer:uglify:core', 'jshint');
    });


    grunt.registerTask('js-require', [], function() {
        // grunt.loadNpmTasks('grunt-contrib-jshint');
        // grunt.loadNpmTasks('grunt-contrib-copy');
        // grunt.loadNpmTasks('grunt-stripcomments');
        // grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.task.run('uglify:require');
    });

    grunt.registerTask('js-external', [], function() {
        // grunt.loadNpmTasks('grunt-contrib-jshint');
        // grunt.loadNpmTasks('grunt-contrib-copy');
        // grunt.loadNpmTasks('grunt-stripcomments');
        grunt.loadNpmTasks('grunt-contrib-concat');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.task.run('concat', 'uglify:external');
    });

    // TOOLS

    grunt.registerTask('tools', [], function() {
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-copy');
        // grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.task.run('clean', 'copy');
    });

    // TEMPLATE

    grunt.registerTask('template', [], function() {
        // grunt.loadNpmTasks('grunt-text-replace');
        grunt.loadNpmTasks('grunt-wiredep');
        grunt.loadNpmTasks('grunt-html-build');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        // grunt.loadNpmTasks('grunt-prettify');
        grunt.task.run('wiredep', 'htmlbuild', 'htmlmin');
    });
    grunt.registerTask('template-newer', [], function() {
        // grunt.loadNpmTasks('grunt-text-replace');
        // grunt.loadNpmTasks('grunt-wiredep');
        grunt.loadNpmTasks('grunt-html-build');
        grunt.loadNpmTasks('grunt-contrib-htmlmin');
        grunt.loadNpmTasks('grunt-prettify');
        grunt.loadNpmTasks('grunt-newer');
        grunt.task.run('newer:htmlbuild', 'newer:htmlmin', 'newer:prettify');
    });

    //
    // SINGLE / VARIOUS
    //

    grunt.registerTask('manifest', [], function() {
        grunt.loadNpmTasks('grunt-manifest');
        grunt.task.run('manifest');
    });

    grunt.registerTask('require', [], function() {
        grunt.loadNpmTasks('grunt-contrib-requirejs');
        grunt.loadNpmTasks('grunt-bower-requirejs');
        grunt.loadNpmTasks('grunt-umd');
        grunt.task.run('requirejs', 'bowerRequirejs', 'umd');
    });

    grunt.registerTask('wiredep', [], function() {
        grunt.loadNpmTasks('grunt-wiredep');
        grunt.task.run('wiredep');
    });
    grunt.registerTask('gzip', [], function() {
        grunt.loadNpmTasks('grunt-gzip');
        grunt.task.run('gzip');
    });

    grunt.registerTask('compress-css', [], function() {
        grunt.loadNpmTasks('grunt-contrib-compress');
        grunt.task.run('compress:css');
    });

    grunt.registerTask('watch', [], function() {
        grunt.loadNpmTasks('grunt-contrib-watch');
        grunt.task.run('watch');
    });

    grunt.registerTask('bower', [], function() {
        grunt.loadNpmTasks('grunt-bower-concat');
        grunt.loadNpmTasks('grunt-postcss');
        grunt.task.run('bower_concat');
    });


    grunt.registerTask('speed', [], function() {
        grunt.loadNpmTasks('grunt-pagespeed');
        grunt.task.run('pagespeed');
    });

    grunt.registerTask('uncss', [], function() {
        grunt.loadNpmTasks('grunt-uncss');
        grunt.task.run('uncss');
    });

    grunt.registerTask('images', [], function() {
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        grunt.task.run('imagemin');
    });

    grunt.registerTask('images-2', [], function() {
        grunt.loadNpmTasks('grunt-image');
        grunt.task.run('image');
    });
    grunt.registerTask('performance', [], function() {
        grunt.loadNpmTasks('grunt-phantomas');
        grunt.task.run('phantomas');
    });

    grunt.registerTask('bower_clean', [], function() {
        grunt.loadNpmTasks('grunt-bower-clean');
    });


};
