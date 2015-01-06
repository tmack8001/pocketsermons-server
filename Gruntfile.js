module.exports = function (grunt) {
    var paths = {
        frontjs: ['public/javascripts/*.js', 'public/javascripts/**/*.js'],
        backjs: ['routes/*.js', 'models/*.js', 'app.js'],
        testjs: ['test/**/*.js'],
        html: ['views/*.jade', 'public/**/*.html']
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

        nodemon: {
            options: {
                watch: paths.backjs,
                callback: function(nodemon) {
                    nodemon.on('log', function (event) {
                        console.log(event.colour)
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
                files: paths.frontjs.concat(paths.html).concat(['.rebooted']),
                tasks: ['jshint:frontend'],
                options: {
                    livereload: true
                }
            },
            backend: {
                files: paths.backjs,
                tasks: ['jshint:backend']
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

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('default', ['jshint', 'concurrent:dev']);
};
		
