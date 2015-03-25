module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 文件合并
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        //js压缩

        //uglify: {
        //    options: {
        //        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        //    },
        //    dist: {
        //        files: {
        //            'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        //        }
        //    }
        //},
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    mangle: true,
                    cwd: 'src/api',
                    src: '**/*.js',
                    dest: 'dist/api/'
                }]
            }
        },


        //压缩CSS
        cssmin: {
            prod: {
                options: {
                    report: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'src',
                        src: '**/*.css',
                        dest: 'dist/'
                    }
                ]
            }
        },
        //压缩图片

        //imagemin: {
        //    prod: {
        //        options: {
        //            optimizationLevel: 7,
        //            pngquant: true
        //        },
        //        files: [
        //            {expand: true, cwd: 'dist/html', src: ['app/Images/*.{png,jpg,jpeg,gif,webp,svg}'], dest: 'dist/html/images'}
        //        ]
        //    }
        //},

        imagemin: {                          // Task
            static: {                          // Target
                options: {                       // Target options
                    optimizationLevel: 3,
                    svgoPlugins: [{removeViewBox: false}]
                    //use: [mozjpeg()]
                },
                files: {                         // Dictionary of files
                    'dist/html/images/login_logo.png': 'src/app/Images/login_logo.png' // 'destination': 'source'
                    //'dist/img.jpg': 'src/img.jpg',
                    //'dist/img.gif': 'src/img.gif'
                }
            },
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'src/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'dist/'                  // Destination path prefix
                }]
            }
        },

        //压缩HTML

        //htmlmin: {
        //    options: {
        //        removeComments: true,
        //        removeCommentsFromCDATA: true,
        //        collapseWhitespace: true,
        //        collapseBooleanAttributes: true,
        //        removeAttributeQuotes: true,
        //        removeRedundantAttributes: true,
        //        useShortDoctype: true,
        //        removeEmptyAttributes: true,
        //        removeOptionalTags: true
        //    },
        //    html: {
        //        files: [
        //            {expand: true, cwd: 'dist/html', src: ['*.html'], dest: 'dist/html'}
        //        ]
        //    }
        //},
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                //files: {                                   // Dictionary of files
                //    'dist/main.html': 'src/app/main.html',     // 'destination': 'source'
                //    'dist/login_p.html': 'src/app/login_p.html'
                //}
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.html',
                    dest: 'dist/'
                }]
            }
        },

        //单元测试
        qunit: {
            all: {
                options: {
                    urls: [
                        'http://localhost:8080/login_p.html'
                    ]
                }
            }
        },
        //检查错误
        jshint: {
            files: [
                //'gruntfile.js',
                'api/**/*.js'
                //'test/**/*.js'
            ],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        //文件检测
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('qq', ['jshint', 'qunit']);
    grunt.registerTask('ww', ['imagemin', 'cssmin', 'htmlmin']);
    grunt.registerTask('test', ['uglify' , 'htmlmin']);
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};
