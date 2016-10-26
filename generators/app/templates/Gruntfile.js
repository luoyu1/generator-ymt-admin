// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {
    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '@*/grunt-*']
    });

    // configurable paths
    var config = {
        app: 'app',
        assets: 'assets',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Project settings
        config: config,
        watch: {
            //includereplace: {
            //    files: ['<%= config.app %>/{,*/}*.html', '!<%= config.app %>/index.html'],
            //    tasks: ['includereplace']
            //},
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/**/*.{scss,sass}', '<%= config.assets %>/**/*.{scss,sass}'],
                tasks: ['sass', 'postcss']
            },
            js: {
                files: ['<%= config.app %>/**/*.js'],
                options: {
                    livereload: 23436
                }
            },
            less: {
                files: '<%= config.app %>/styles/{,*/}*.less',
                tasks: ['less']
            },
            styles: {
                files: ['<%= config.app %>/**/*.css'],
                tasks: ['newer:copy:styles', 'postcss']
            }
        },
        browserSync: {
            options: {
                notify: false,
                background: true,
                watchOptions: {
                    ignored: ''
                }
            },
            livereload: {
                options: {
                    files: [
                        '<%= config.app %>/{,*/}*.html',
                        '.tmp/**/*.css',
                        '<%= config.app %>/images/{,*/}*',
                        '<%= config.app %>/**/*.js',
                        '<%= config.assets %>/**/*.js',
                        '.tmp/**/*.js'
                    ],
                    port: 8000,
                    server: {
                        baseDir: ['.tmp', config.app, config.assets],
                        routes: {
                            '/bower_components': './bower_components',
                            '/assets': './assets'
                        }
                    }
                }
            },
            /*
            test: {
                options: {
                    port: 9001,
                    open: false,
                    logLevel: 'silent',
                    host: 'localhost',
                    server: {
                        baseDir: ['.tmp', './test', config.app],
                        routes: {
                            '/bower_components': './bower_components'
                        }
                    }
                }
            },*/
            dist: {
                options: {
                    background: false,
                    server: '<%= config.dist %>'
                }
            }
        },
        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                sourceMap: true,
                sourceMapEmbed: true,
                sourceMapContents: true,
                includePaths: ['.']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['**/*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    // Add vendor prefixed styles
                    require('autoprefixer')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
                    })
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        // Automatically inject Bower components into the HTML file
        wiredep: {
            app: {
                src: ['<%= config.app %>/index.html'],
                //exclude: ['bootstrap.js'],
                ignorePath: /^(\.\.\/)*\.\./
            },
            sass: {
                src: ['<%= config.app %>/**/*.{scss,sass}'],
                ignorePath: /^(\.\.\/)+/
            }
        },
        // cssmin: {
        //     dist: {
        //         options: {
        //             banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
        //         },
        //         files: {
        //             '<%= config.dist %>/styles/main.min.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    // true would impact styles with attribute selectors
                    removeRedundantAttributes: false,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/{,*/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*.*',
                    '<%= config.dist %>/styles/fonts/{,*/}*.*',
                    '<%= config.dist %>/*.{ico,png}'
                ]
            }
        },
        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            },
            html: ['<%= config.app %>/{,*/}*.html']
        },
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/styles'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/**/*.css']
        },
        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                reporter: require('jshint-stylish'), // use jshint-stylish to make our errors look and read good
                jshintrc: '.jshintrc'
            },
            // when this task is run, lint the Gruntfile and all js files in scripts
            all: [
                'Gruntfile.js',
                '<%= config.app %>/**/*.js'
            ]
        },
        /*
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },*/

        // By default, your `index.html`'s <!-- Usemin block --> will take care
        // of minification. These next options are pre-configured if you do not
        // wish to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= config.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= config.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= config.dist %>/scripts/scripts.js': [
        //         '<%= config.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },
        // Copies remaining files to places other tasks can use
        // Run some tasks in parallel to speed up build process
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'fonts/{,*/}*.*',
                        'styles/fonts/{,*/}*.*',
                        'styles/images/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '.',
                    flatten: true,
                    filter: 'isFile',
                    src: 'bower_components/font-awesome/fonts/{,*/}*.*',
                    dest: '<%= config.dist %>/fonts/'
                }, {
                    expand: true,
                    cwd: '<%= config.assets %>/styles',
                    dest: '.tmp/styles/',
                    src: ['**/*.css']
                }, {
                    expand: true,
                    cwd: '.tmp/styles/',
                    dest: '<%= config.dist %>/styles',
                    src: '{,*/}*.css'
                }, {
                    expand: true,
                    cwd: '<%= config.app %>/',
                    dest: '<%= config.dist %>/',
                    src: ['**/*.js']
                }]
            },
            extra_asset: {
                expand: true,
                cwd: '<%= config.assets %>/images',
                dest: '<%= config.dist %>/images',
                src: '*.{ico,png,jpg,jpeg,gif}'
            }
        },
        concurrent: {
            server: [
                'sass'
            ],
            dist: [

                'sass'
            ]
        },
        requirejs: {
            compile: {
                options: {
                    name: 'main',
                    baseUrl: ".",
                    mainConfigFile: "./main.js",
                    out: "./optimized.js",
                    preserveLicenseComments: false,
                    include: ['path/to/require.js']
                }
            }
        }
        //includereplace: {
        //    build: {
        //        options: {
        // Task-specific options go here.
        //        },
        // Files to perform replacements and includes with
        //        src: '<%= config.app %>/template*.html',
        // Destination directory to copy files to
        //       dest: '<%= config.app %>/index.html'
        //   }
        //}
    });

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

    grunt.registerTask('serve', 'start the server and preview your app', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'browserSync:dist']);
        }

        grunt.task.run([
            'clean:server',
            //'includereplace',
            //'wiredep',
            'concurrent:server',
            'copy:dist',
            'postcss',
            'browserSync:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    /*
        grunt.registerTask('test', function(target) {
            if (target !== 'watch') {
                grunt.task.run([
                    'clean:server',
                    'concurrent:test',
                    'postcss'
                ]);
            }

            grunt.task.run([
                'browserSync:test',
                'mocha'
            ]);
        });
    */
    grunt.registerTask('build', [
        'clean:dist',
        //'includereplace',
        //'wiredep',
        'concurrent:dist',
        'copy:dist',
        'useminPrepare',
        'postcss',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'copy:extra_asset'
    ]);

    grunt.registerTask('default', [
        //'test',
        'build'
    ]);
};
