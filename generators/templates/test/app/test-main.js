
(function() {
    var tests = [];
    for (var file in window.__karma__.files) {
        if (/^\/base\/test\/app.+\.spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
    //mock trick
    tests.push('/base/app/scripts/mock_inject.js');
    //mock trick
    requirejs.config({
        // Karma serves files from '/base'
        baseUrl: '/base/app/scripts',
        shim: {
            underscore: {
                exports: "_"
            },
            backbone: {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            }
        },
        paths: {
            //zepto:'../bower_components/zeptojs/dist/zepto',
            jquery: ['../bower_components/jquery/dist/jquery.min'],
            backbone: ['../bower_components/backbone/backbone'],
            underscore: ['../bower_components/lodash/dist/lodash.min'],
            'chai':  '../../node_modules/chai/chai',
            mock: '../bower_components/mockjs/dist/mock',
            'templates':'../../.tmp/scripts/templates'
        },

        // ask Require.js to load these files (all our tests)
        deps: tests,
        captureTimeout: 60000,

        // start test run, once Require.js is done
        callback: window.__karma__.start
    });
})();