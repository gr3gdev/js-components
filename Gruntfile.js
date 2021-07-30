module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                process: function(src, path){
                    return '\n/* Source: ' + path + ' */\n' + src;
                }
            },
            dist: {
                src: [
                    'js/element.js',
                    'js/fields.js',
                    'js/fields/input.js',
                    'js/fields/input/text.js',
                    'js/fields/input/password.js',
                    'js/fields/input/date.js',
                    'js/fields/input/time.js',
                    'js/fields/input/file.js',
                    'js/fields/input/checkbox.js',
                    'js/fields/input/radio.js',
                    'js/fields/button.js',
                    'js/fields/select.js',
                    'js/fields/multiselect.js',
                    'js/message.js',
                    'js/modal.js',
                    'js/table.js',
                    'js/tabs.js',
                    'js/list.js'
                ],
                dest: 'dist/js/components-concat.js'
            }
        },
        uglify: {
            options: {
                preserveComments: false,
                compress: {
                    drop_console: true
                }
            },
            components: {
                files: {
                    'dist/js/components.min.js': ['dist/js/components-concat.js']
                }
            }
        },
        run: {
            sample: {
                cmd: 'node',
                args: [
                    'sample.js'
                ]
            }
        },
        watch: {
            options: {
                atBegin: true,
                livereload: true,
                event: ['all']
            },
            srcCSS: {
                files: 'css/components/*.scss',
                tasks: ['sass']
            },
            distCSS: {
                files: 'dist/css/*.css',
                tasks: ['cssmin']
            },
            srcJS: {
                files: ['js/**/*.js', 'css/*.scss'],
                tasks: ['sass', 'concat']
            },
            distJS: {
                files: 'dist/js/components-concat.js',
                tasks: ['uglify']
            }
        },
        express: {
            options: {              
                port: 3000
            },
            dev: {
                 options: {
                     script: 'sample.js'
                 }
            }
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'css/components',
                    src: ['*.scss'],
                    dest: 'dist/css',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: [{
                    expand: true,
                    cwd: 'dist/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');

    grunt.registerTask('default', ['sass', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('sample', ['express:dev', 'watch']);
}