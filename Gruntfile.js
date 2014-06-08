module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            index: {
                src: 'assets/index.html',
                dest: 'public/index.html'
            },
            images: {
                expand: true,
                cwd: 'assets/',
                src: ['img/**/*.{gif,png,ico}'],
                dest: 'public/'
            },
            bootstrap: {
                expand: true,
                cwd: 'bower_components/bootstrap/dist/',
                src: ['**/*.{min.css,eot,svg,ttf,woff}'],
                dest: 'public/'
            }
        },

        less: {
            dist: {
                options: {
                    cleancss: true
                },
                files: {
                    'public/css/style.css': 'assets/css/style.less'
                }
            }
        },

        concat: {
            libs: {
                src: [
                    'bower_components/marked/lib/marked.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/handlebars/handlebars.runtime.min.js',
                    'bower_components/ember/ember.min.js',
                    'bower_components/ember-data/ember-data.min.js',
                ],
                dest: 'public/js/libs.js'
            }
        },

        uglify: {
            app: {
                files: {
                    'public/js/app.js': ['assets/js/**/*.js']
                }
            }
        },

        emberTemplates: {
            compile: {
                options: {
                    templateBasePath: 'assets/js/templates/'
                },
                files: {
                    'public/js/templates.js': 'assets/js/templates/**/*.hbs'
                }
            }
        },

        watch: {
            index: {
                files: 'assets/index.html',
                tasks: ['copy:index']
            },
            less: {
                files: ['assets/css/**/*.less'],
                tasks: ['less']
            },
            emberTemplates: {
                files: ['assets/js/templates/**/*.hbs'],
                tasks: ['emberTemplates']
            },
            libs: {
                files: ['bower_components/**/*.js'],
                tasks: ['concat:libs']
            },
            app: {
                files: ['assets/js/**/*.js'],
                tasks: ['concat:app']
            },
            bootstrap: {
                files: ['bower_components/bootstrap/**/*'],
                tasks: ['copy:boostrap', 'less']
            },
        },

        clean: {
            all: ['public/*']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ember-templates');

    grunt.registerTask('default', ['copy', 'less', 'concat', 'uglify', 'emberTemplates']);
};
