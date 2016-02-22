/*jshint latedef:false */
var path = require('path');
var util = require('util');
var ejs = require('ejs');
var pascalCase = require('pascal-case');
var yeoman = require('yeoman-generator');
var scriptBase = require('../../script-base');

var CollectionGenerator = scriptBase.extend({
    constructor: function () {
        scriptBase.apply(this, arguments);

        var dirPath = '../templates';
        this.sourceRoot(path.join(__dirname, dirPath));
    },

    writing: {
        createControllerFiles: function () {
            this._writeTemplate(
                'collection',
                path.join(this.env.options.appPath + '/scripts/collections', this.name),
                {
                    appClassName: pascalCase(this.appname),
                    className: pascalCase(this.name)
                }
            );

            if (!this.options.requirejs) {
                this._addScriptToIndex('collections/' + this.name);
            }
        },
        createServerControllerFiles: function () {
            var sourceRoot = '../../generators/templates';
            this.sourceRoot(path.join(__dirname, sourceRoot));
            this.fs.copyTpl(
                this.templatePath('server/api/index.js.ejs'),
                this.destinationPath('server/api/'+this.name+"/index.js"),
                {
                    className: pascalCase(this.name)
                }
            );
            this.fs.copyTpl(
                this.templatePath('server/api/controller.js'),
                this.destinationPath('server/api/'+this.name+"/"+this.name+".controller.js")
            );
            var routesFile=this.fs.read(this.destinationPath('server/routes/api.js'),{raw:false,defaults:''}),
                insertFlag='{{insertFlag}}',
                codeTemplate="    app.use('/<%=className %>',require('./../api/<%=className %>/index'));";
            var insertPlace=routesFile.indexOf(insertFlag)+insertFlag.length;
            var renderContent=ejs.render(codeTemplate,{className: this.name});
            if(~routesFile.indexOf(renderContent)===0){
                var newRoutesFile=[
                    routesFile.slice(0,insertPlace),
                    "\n",
                    renderContent,
                    routesFile.slice(insertPlace)];
                this.fs.write(
                    this.destinationPath('server/routes/api.js'),
                    newRoutesFile.join("")
                );
            }
        },
        composeTest: function () {
            this._generateTest('collection');
        }
    },


});

module.exports = CollectionGenerator;
