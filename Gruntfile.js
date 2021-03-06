module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.css', '*.html'],
                tasks: ['jshint', 'cssmin', 'uglify'],
            },
            options: {
                livereload: true
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1,
                sourceMaps: true
            },
            target: {
                files: {
                    './dist/style/style.min.css': ['./style/style.css']
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                esversion: 6,
                strict: 'implied',
                browser: true,
                force: true,
                module: true,
                devel: true,
                reporter: require('jshint-stylish')
            },
            all: ['Gruntfile.js', 'src/scripts/*.js'],
        },
        uglify: {
            my_target: {
                options: {
                    sourceMap: true,
                    sourceMapName: './dist/script/app.map'
                },
                files: {
                    './dist/script/app.min.js': [
                        './scripts/score.js',
                        './scripts/node.js',
                        './scripts/pellet.js',
                        './scripts/snake.js',
                        './scripts/board.js'
                    ]
                }
            }
        },
        connect: {
            server: {
                options: {
                    // keepalive: true
                    livereload: true
                }
            }
        },
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    // Default task(s).
    grunt.registerTask('default', ['connect', 'watch', 'jshint', 'cssmin', 'uglify']);

};