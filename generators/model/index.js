/*jshint latedef:false */
var path = require('path');
var util = require('util');
var pascalCase = require('pascal-case');
var Inflector = require('inflected');
var yeoman = require('yeoman-generator');
var scriptBase = require('../../script-base');

var ModelGenerator = scriptBase.extend({
    constructor: function (name) {
        scriptBase.apply(this, arguments);

        // XXX default and banner to be implemented
        this.argument('attributes', {
            type: Array,
            defaults: [],
            banner: 'field[:type] field[:type]'
        });

        // parse back the attributes provided, build an array of attr
        this.attrs = this['attributes'].map(function (attr) {
            var parts = attr.split(':');
            return {
                name: parts[0],
                type: parts[1] || 'string'
            };
        });
        this.name=Inflector.singularize(this.name);
        this.includeRequireJS=this.config.get('includeRequireJS');
    },

    writing: {
        createModelFiles: function () {
            this._writeTemplate(
                'model',
                path.join(this.env.options.appPath, '/scripts/models', this.name),
                {
                    appClassName: pascalCase(this.appname),
                    className: pascalCase(this.name)
                }
            );

            if (!this.options.requirejs) {
                this._addScriptToIndex('models/' + this.name);
            }
        },
        createServerControllerFiles: function () {
            var sourceRoot = '../../generators/templates';
            this.sourceRoot(path.join(__dirname, sourceRoot));
            this.fs.copyTpl(
                this.templatePath('server/models/model.js.ejs'),
                this.destinationPath('server/models/' + this.name + ".model.js"),
                {
                    className: pascalCase(this.name)
                }
            );
            if(this.config.get('includeSequelize')){
                this.fs.copyTpl(
                    this.templatePath('server/sqldb/sequelize.js.ejs'),
                    this.destinationPath('server/sqldb/' + this.name + ".model.js"),
                    {
                        className: pascalCase(this.name)
                    }
                );
            }
        },
        createTestFiles: function () {
            var sourceRoot = '../../generators/templates';
            this.sourceRoot(path.join(__dirname, sourceRoot));
            this.fs.copyTpl(
                this.templatePath('test/app/models/spec.js.ejs'),
                this.destinationPath('test/app/models/'+this.name.toString().toLowerCase()+".spec.js"),
                {
                    includeRequireJS:this.includeRequireJS,
                    appSlugName: pascalCase(this.appname),
                    className: pascalCase(this.name)
                }
            );
        }
    }
});

module.exports = ModelGenerator;
