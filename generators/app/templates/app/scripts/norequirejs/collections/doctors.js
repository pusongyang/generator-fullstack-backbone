/*global TrdBoss, Backbone*/

TrdBoss.Collections = TrdBoss.Collections || {};

(function () {
    'use strict';
    TrdBoss.Collections.Doctors = Backbone.Collection.extend({
        url: '/doctors',
        completed: function () {
            console.log("completed");
            return this.where({completed: true});
        },
        model: TrdBoss.Models.Doctor
    });
})();
