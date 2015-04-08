module.exports = function (grunt) {
    var paths = {
        frontend: {
            js: ['public/javascripts/**/*.js'],
            templates: ['public/**/*.html'],
            tests: []
        },
        backend: {
            js: ['routes/**/*.js', 'models/**/*.js', 'app.js'],
            templates: ['views/**/*.jade'],
            tests: ['test/**/*.js']
        }
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
                src: paths.frontend.js.concat(paths.frontend.tests)
            },
            backend: {
                src: paths.backend.js.concat(paths.backend.tests)
            },
            test: {
                src: paths.frontend.tests.concat(paths.backend.tests)
            }
        },

        nodemon: {
            options: {
                watch: paths.backend.js.concat(paths.backend.templates),
                callback: function(nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour);
                    });

                    nodemon.on('restart', function() {
                        require('fs').writeFileSync('.rebooted', 'rebooted');
                    });
                }
            },
            dev: {
                script: './bin/www'
            }
        },

        watch: {
            options: {
                spawn: false
            },
            frontend: {
                files: paths.frontend.js.concat(paths.frontend.templates).concat(['.rebooted']),
                tasks: ['jshint:frontend'],
                options: {
                    livereload: true
                }
            },
            backend: {
                files: paths.backend.js,
                tasks: ['jshint:backend']
            },
            tests: {
                files: paths.backend.tests,
                tasks: ['jshint:backend', 'test']
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            dev: {
                tasks: ['nodemon', 'watch:frontend', 'watch:backend']
            }
        }


    });

    // load contrib tasks
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['jshint', 'concurrent:dev']);
};
		
