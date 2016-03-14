/*jshint latedef:false */
var path = require('path');
var util = require('util');
var pascalCase = require('pascal-case');
var Inflector = require('inflected');
var yeoman = require('yeoman-generator');
var scriptBase = require('../../script-base');

var ViewGenerator = scriptBase.extend({
    constructor: function () {
        scriptBase.apply(this, arguments);

        var dirPath = '../templates';
        this.sourceRoot(path.join(__dirname, dirPath));
        this.name = Inflector.singularize(this.name);
        this.includeRequireJS=this.config.get('includeRequireJS');
    },

    writing: {
        createViewFiles: function () {
            var templateFramework = this.config.get('templateFramework') || 'lodash';
            var templateExt = '.ejs';
            this.jst_path = this.env.options.appPath + '/scripts/templates/' + this.name + templateExt;
            this.template('view.ejs', this.jst_path);

            this._writeTemplate(
                'view',
                path.join(this.env.options.appPath + '/scripts/views', this.name.toString().toLowerCase()),
                {
                    appClassName: pascalCase(this.appname),
                    className: pascalCase(this.name),
                    collectionName: pascalCase( Inflector.pluralize(this.name) ),
                    'jst_path': this.jst_path
                }
            );

            if (!this.options.requirejs) {
                this._addScriptToIndex('views/' + this.name);
            }
        },
        createTestFiles: function () {
            var sourceRoot = '../../generators/templates';
            this.sourceRoot(path.join(__dirname, sourceRoot));
            this.fs.copyTpl(
                this.templatePath('test/app/views/spec.js.ejs'),
                this.destinationPath('test/app/views/'+this.name.toString().toLowerCase()+".spec.js"),
                {
                    includeRequireJS:this.includeRequireJS,
                    appSlugName: pascalCase(this.appname),
                    className: pascalCase(this.name),
                    collectionName:pascalCase( Inflector.pluralize(this.name) )
                }
            );
        }
    }
});

module.exports = ViewGenerator;
