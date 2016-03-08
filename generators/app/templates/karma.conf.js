// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['mocha','chai' ],

        client: {
            mocha: {
                timeout: 5000 // set default mocha spec timeout
            }
        },

        preprocessors: {
            'test/test.html': ['html2js']
        },

        // list of files / patterns to load in the browser
        files: [
            // bower:js
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/lodash/dist/lodash.compat.js',
            'app/bower_components/backbone/backbone.js',
            'app/bower_components/mockjs/dist/mock.js',
            // endbower
            'node_modules/socket.io-client/socket.io.js',
            '.tmp/scripts/templates.js',
            'app/scripts/vendor/*.js',
            'app/scripts/inject.js',
            'app/scripts/main.js',
            'app/scripts/models/*.js',
            'app/scripts/collections/*.js',
            'app/scripts/views/*.js',
            'test/app/**/*.spec.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8083,
        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        // reporter types:
        // - dots
        // - progress (default)
        // - spec (karma-spec-reporter)
        // - junit
        // - growl
        // - coverage
        reporters: ['spec'],

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: true,
        concurrency: Infinity
    });
};
