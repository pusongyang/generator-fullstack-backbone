/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/doctors',
    'templates'
], function ($, _, Backbone, DoctorsCollection, JST) {
    'use strict';

    var DoctorView = Backbone.View.extend({
        tagName: 'div',
        template: JST['app/scripts/templates/doctor.ejs'],
        collectionFun:DoctorsCollection,
        events: {
        },
        initialize: function (collection) {
            if(collection instanceof this.collectionFun){
                this.collection=collection;
            }else{
                this.collection=new this.collectionFun();
                this.collection.fetch({beforeSend:function(xhr){
                },reset:true,data:{}});
            }
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(this.template({doctors:this.collection.toJSON()}));
            $('#body').html(this.$el.html());
            this.trigger("render", "render done!");
            return this;
        },
        remove: function(){
            this.undelegateEvents();
        }
    });

    return DoctorView;
});
