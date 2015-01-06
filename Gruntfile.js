module.exports = function(grunt) {
    var paths = {
        frontjs: ['public/javascripts/*.js', 'public/javascripts/**/*.js'],
        backjs: ['routes/*.js', 'models/*.js', 'app.js'],
        testjs: ['test/**/*.js']
    };

    grunt.config.init({
        jshint: {
            options: {
                jshintrc: true
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            frontend: {
                src: paths.frontjs
            },
            backend: {
                src: paths.backjs
            },
            test: {
                src: paths.testjs
            }
        },

        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },

            frontend: {
                files: paths.frontjs,
                tasks: ['jshint:frontend'],
                options: {
                    spawn: false
                }
            },

            backend: {
                files: paths.backjs,
                tasks: ['jshint:backend'],
                options: {
                    spawn: false
                }
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['watch:frontend', 'watch:backend']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['jshint', 'concurrent:dev']);
};
		
