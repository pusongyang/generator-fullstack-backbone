'use strict';
var util = require('util');
var path = require('path');
var ejs = require('ejs');
var htmlWiring = require('html-wiring');
var mkdirp = require('mkdirp');
var pascalCase = require('pascal-case');
var yeoman = require('yeoman-generator');

var BackboneGenerator = yeoman.generators.Base.extend({
    constructor: function () {
        yeoman.generators.Base.apply(this, arguments);

        this.option('skip-install', {
            desc: 'Skip the bower and npm installations',
            defaults: true
        });
        this.appname = pascalCase(this.appname);

        this.config.defaults({
            appName: this.appname
        });
        //this.indexFile = htmlWiring.readFileAsString(this.templatePath('app/index.html'));
    },

    prompting: function () {
        var cb = this.async();

        // welcome message
        this.log(this.yeoman);
        this.log('Out of the box I include HTML5 Boilerplate, jQuery and Backbone.js.');

        var prompts = [{
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                name: 'Use RequireJS',
                value: 'requirejs',
                checked: this.config.get("includeRequireJS")
            }, {
                name: 'Use Modernizr',
                value: 'modernizr',
                checked: this.config.get("includeModernizr")
            }]
        }, {
            type: 'list',
            name: 'cssUILib',
            message: 'which UI framework would you like?',
            choices: [{
                name: 'Materialize CSS for Sass',
                value: 'sassMaterialize'
            }, {
                name: 'Foundation5 for Sass',
                value: 'sassFoundation'
            }, {
                name: 'Twitter Bootstrap for Sass',
                value: 'sassBootstrap'
            }, {
                name: 'None of those',
                value: 'none'
            }],
            default:this.config.get("cssUILib")
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features,
                cssUILib = answers.cssUILib;

            function hasFeature(feat) {
                return features.indexOf(feat) !== -1;
            }

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.includeRequireJS = hasFeature('requirejs');
            this.includeModernizr = hasFeature('modernizr');
            this.cssUILib = cssUILib;
            this.env.options.appPath="app";

            this.config.set('includeRequireJS', this.includeRequireJS);
            this.config.set('includeModernizr', this.includeModernizr);
            this.config.set('cssUILib', cssUILib);
            cb();
        }.bind(this));
    },

    writing: {
        git: function () {
            this.fs.copyTpl(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );
        },
        bower: function () {
            this.fs.copyTpl(
                this.templatePath('bowerrc'),
                this.destinationPath('.bowerrc')
            );
            this.fs.copyTpl(
                this.templatePath('_bower.json.ejs'),
                this.destinationPath('bower.json'),
                {
                    appSlugName: this.appname,
                    includeRequireJS: this.includeRequireJS,
                    includeModernizr: this.includeModernizr,
                    cssUILib: this.cssUILib
                }
            );
        },
        editorConfig: function () {
            this.fs.copyTpl(
                this.templatePath('editorconfig'),
                this.destinationPath('.editorconfig')
            );
        },
        gruntfile: function () {
            this.fs.copyTpl(
                this.templatePath('Gruntfile.js.ejs'),
                this.destinationPath('Gruntfile.js'),
                {
                    appPath: this.env.options.appPath,
                    includeRequireJS: this.includeRequireJS,
                    cssUILib: this.cssUILib
                }
            );
        },
        packageJSON: function () {
            this.fs.copyTpl(
                this.templatePath('_package.json.ejs'),
                this.destinationPath('package.json'),
                {
                    includeRequireJS: this.includeRequireJS,
                    cssUILib: this.cssUILib
                }
            );
        },
        mainStylesheet: function () {
            if (this.cssUILib==="none") {
                this.fs.write(
                    this.destinationPath(this.env.options.appPath + '/styles/main.css'),
                    "html {font-family: sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;}"
                );
            }else{
                this.fs.copyTpl(
                    this.templatePath(this.env.options.appPath + '/styles/sass/main.scss'),
                    this.destinationPath(this.env.options.appPath + '/styles/sass/main.scss')
                );
            }
        },
        writeIndex: function () {
            this.indexFile = htmlWiring.readFileAsString(this.templatePath('app/index.html.ejs'));
            this.indexFile = ejs.render(
                this.indexFile,
                {
                    appName: this.appname,
                    includeModernizr: this.includeModernizr,
                    includeRequireJS: this.includeRequireJS,
                    cssUILib: this.cssUILib
                }
            );
        },
        mainScript:function(){
            if(this.includeRequireJS){
                this.fs.copyTpl(
                    this.templatePath('app/scripts/main_requirejs.js.ejs'),
                    this.destinationPath(this.env.options.appPath + '/scripts/main.js'),
                    {
                        cssUILib: this.cssUILib
                    }
                );
                this.fs.copyTpl(
                    this.templatePath('app/scripts/routes/all_requirejs.js.ejs'),
                    this.destinationPath(this.env.options.appPath + '/scripts/routes/all.js')
                );
            }else{
                this.fs.copyTpl(
                    this.templatePath('app/scripts/main.js.ejs'),
                    this.destinationPath(this.env.options.appPath + '/scripts/main.js'),
                    {
                        appSlugName: this.appname
                    }
                );
                this.fs.copyTpl(
                    this.templatePath('app/scripts/routes/main.js.ejs'),
                    this.destinationPath(this.env.options.appPath + '/scripts/routes/all.js'),
                    {
                        appSlugName: this.appname
                    }
                );
            }
        },
        setupEnv: function () {
            mkdirp.sync(
                this.templatePath(this.env.options.appPath)
            );
            mkdirp.sync(
                this.templatePath(this.env.options.appPath + '/scripts')
            );
            mkdirp.sync(
                this.templatePath(this.env.options.appPath + '/scripts/vendor/')
            );
            mkdirp.sync(
                this.templatePath(this.env.options.appPath + '/styles')
            );
            mkdirp.sync(
                this.templatePath(this.env.options.appPath + '/images')
            );
            this.fs.copy(
                this.templatePath('app/*.html'),
                this.destinationPath(this.env.options.appPath + '/')
            );
            this.fs.copy(
                this.templatePath('app/favicon.ico'),
                this.destinationPath(this.env.options.appPath + '/favicon.ico')
            );
            this.fs.copy(
                this.templatePath('app/robots.txt'),
                this.destinationPath(this.env.options.appPath + '/robots.txt')
            );
            this.fs.copy(
                this.templatePath('app/scripts/vendor/**'),
                this.destinationPath(this.env.options.appPath + '/scripts/vendor/')
            );
            this.fs.write(
                this.destinationPath(path.join(this.env.options.appPath, '/index.html')),
                this.indexFile
            );
//server side create
            mkdirp.sync(
                this.templatePath("server")
            );
            mkdirp.sync(
                this.templatePath("server/api")
            );
            mkdirp.sync(
                this.templatePath("server/config")
            );
            mkdirp.sync(
                this.templatePath("server/config/environment")
            );
            mkdirp.sync(
                this.templatePath("server/models")
            );
            mkdirp.sync(
                this.templatePath("server/routes")
            );
            this.fs.copyTpl(
                this.templatePath('server/app.js'),
                this.destinationPath('server/app.js')
            );
            this.fs.copyTpl(
                this.templatePath('server/config/express.js'),
                this.destinationPath('server/config/express.js')
            );
            this.fs.copyTpl(
                this.templatePath('server/config/environment/index.js'),
                this.destinationPath('server/config/environment/index.js')
            );
            this.fs.copyTpl(
                this.templatePath('server/config/environment/development.js'),
                this.destinationPath('server/config/environment/development.js')
            );
            if( !this.fs.exists(this.destinationPath('server/routes/api.js')) ){
                this.fs.copyTpl(
                    this.templatePath('server/routes/api.js'),
                    this.destinationPath('server/routes/api.js')
                );
            }
        },

        composeTest: function () {
            if (['backbone:app', 'backbone'].indexOf(this.options.namespace) >= 0) {
                this.composeWith(this.testFramework, {
                    'skip-install': this.options['skip-install'],
                    'skipMessage': true
                });
            }
        }
    },

    install: function () {
        var shouldInstall = !this.options['skip-install'];
        var isInstallable = ['backbone:app', 'backbone'].indexOf(this.options.namespace) > -1;
        if (shouldInstall && isInstallable) {
            this.npmInstall();
            this.bowerInstall('', {
                'config.cwd': this.destinationPath('.'),
                'config.directory': path.join(this.config.get('appPath'), 'bower_components')
            });
        }
    },
    end:function(){
        var bowerSassPath="";
        if( this.cssUILib!=="none" ){
            if(this.cssUILib==="sassMaterialize"){
                bowerSassPath="materialize/sass/**";
            }else if(this.cssUILib==="sassFoundation"){
                bowerSassPath="foundation/scss/**";
            }else if(this.cssUILib==="sassBootstrap"){
                bowerSassPath="bootstrap-sass/assets/stylesheets/**";
            }
            this.fs.copy(
                this.destinationPath( path.join("app/bower_components/"+bowerSassPath) ),
                path.join("app/styles/sass/")
            );
        }
        if( this.includeRequireJS){
            this.fs.copy(
                this.destinationPath( path.join("app/bower_components/spin.js/spin.min.js") ),
                path.join("app/scripts/vendor/spin.min.js")
            );
            this.fs.copy(
                this.destinationPath( path.join("app/bower_components/requirejs/require.js") ),
                path.join("app/scripts/vendor/require.js")
            );
        }
    }
});

module.exports = BackboneGenerator;
