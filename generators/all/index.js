var util = require('util');
var mkdirp = require('mkdirp');
var yeoman = require('yeoman-generator');
var pascalCase = require('pascal-case');

var BackboneGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);
        this.appname = pascalCase(this.appname);
        this.argument('name', { type: String, required: true });

        this.args = [this.name];
    },

    install: function () {
        this.composeWith('fullstack-backbone:model', {arguments: this.args});
        this.composeWith('fullstack-backbone:collection', {arguments: this.args});
        this.composeWith('fullstack-backbone:view', {arguments: this.args});
    }
});

module.exports = BackboneGenerator;
