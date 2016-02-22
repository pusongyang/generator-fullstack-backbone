/*global require*/
'use strict';

require.config({
    baseUrl: "scripts/",
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backboneLocalStorage: {
            deps: ['backbone'],
            exports: 'Store'
        },
        foundation:{
            deps: ['jquery','fastclick'],
            exports: 'Foundation'
        }
    },
    paths: {
        //zepto:'../bower_components/zeptojs/dist/zepto',
        jquery: ['//apps.bdimg.com/libs/jquery/2.1.4/jquery.min','../bower_components/jquery/dist/jquery.min'],
        backbone: ['//apps.bdimg.com/libs/backbone.js/1.1.2/backbone-min','../bower_components/backbone/backbone'],
        fastclick: ['//apps.bdimg.com/libs/fastclick/1.0.0/fastclick.min','../bower_components/fastclick/lib/fastclick'],
        underscore: ['//apps.bdimg.com/libs/lodash/3.5.0/lodash','../bower_components/lodash/dist/lodash.min']
    }
});

require([
    'backbone',
    'routes/all',
    'common'
], function (Backbone, AllRouter, Common) {
    Common.app=new AllRouter();
    Backbone.history.start();
    $(document).foundation({bindings: 'events'});
});