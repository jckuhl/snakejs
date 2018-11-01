module.exports = function(grunt) {


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            scripts: {
                files: ['**/*.js', '**/*.css'],
                tasks: ['jshint', 'cssmin', 'uglify'],
            },
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
                    sourceMapName: './dist/app.map'
                },
                files: {
                    './dist/app.min.js': [
                        './scripts/node.js', 
                        './scripts/pellet.js', 
                        './scripts/snake.js', 
                        './scripts/board.js'
                    ]
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify-es');

    // Default task(s).
    grunt.registerTask('default', ['watch', 'jshint', 'cssmin', 'uglify']);

};