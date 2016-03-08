/*global TrdBoss, Backbone*/

TrdBoss.Models = TrdBoss.Models || {};

(function () {
    'use strict';

    TrdBoss.Models.Doctor = Backbone.Model.extend({

        initialize: function () {
        },

        defaults: {
            _id: '',
            name: '',
            email: '',
            image: ''
        },

        validate: function (attrs, options) {
        },

        parse: function (response, options) {
            return response;
        }
    });

})();
