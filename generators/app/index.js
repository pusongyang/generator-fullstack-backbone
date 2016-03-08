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
            defaults: false
        });
        this.argument('app_name', { type: String, required: false });
        this.appname = this.app_name || this.appname;
        this.appname = pascalCase(this.appname);

        this.config.defaults({
            appName: this.appname,
            entryIndex: "index.html",
            serverRouteName: "api"
        });
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
                name: 'Use Mysql Sequelize',
                value: 'sequelize',
                checked: this.config.get("includeSequelize")
            },{
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
        }, {
            type:'input',
            name:'entryIndex',
            message:"what's your default entry file's name?",
            default:this.config.get("entryIndex")
        }, {
            type:'input',
            name:'serverRouteName',
            message:'what\'s your default server route name?',
            default:this.config.get("serverRouteName")
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features,
                cssUILib = answers.cssUILib,
                entryIndex = answers.entryIndex,
                serverRouteName = answers.serverRouteName;
            function hasFeature(feat) {
                return features.indexOf(feat) !== -1;
            }

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.includeRequireJS = hasFeature('requirejs');
            this.includeModernizr = hasFeature('modernizr');
            this.includeSequelize = hasFeature('sequelize');

            this.cssUILib = cssUILib;
            this.entryIndex = entryIndex;
            this.serverRouteName = serverRouteName;

            this.config.set('includeSequelize', this.includeSequelize);
            this.config.set('includeRequireJS', this.includeRequireJS);
            this.config.set('includeModernizr', this.includeModernizr);
            this.config.set('cssUILib', cssUILib);
            this.config.set('entryIndex', entryIndex);
            this.config.set('serverRouteName', serverRouteName);
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
                    appName: this.appname,
                    appPath: 'app',
                    includeRequireJS: this.includeRequireJS,
                    entryIndex:this.entryIndex,
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
                    includeSequelize:this.includeSequelize,
                    cssUILib: this.cssUILib
                }
            );
        },
        mainStylesheet: function () {
            if (this.cssUILib==="none") {
                this.fs.write(
                    this.destinationPath('app/styles/main.css'),
                    "html {font-family: sans-serif;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;}"
                );
            }else{
                this.fs.copyTpl(
                    this.templatePath('app/styles/sass/main.scss'),
                    this.destinationPath('app/styles/sass/main.scss')
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
            var midFolder=(this.includeRequireJS) ? 'requirejs' : 'norequirejs';
            this.fs.copyTpl(
                this.templatePath('app/scripts/'+midFolder+'/main.js.ejs'),
                this.destinationPath('app/scripts/main.js'),
                {
                    cssUILib: this.cssUILib,
                    appSlugName: this.appname
                }
            );
            this.fs.copyTpl(
                this.templatePath('app/scripts/'+midFolder+'/routes/all.js.ejs'),
                this.destinationPath('app/scripts/routes/all.js'),
                {
                    appSlugName: this.appname
                }
            );
        },
        setupEnv: function () {
            mkdirp.sync(
                this.templatePath("app")
            );
            mkdirp.sync(
                this.templatePath('app/scripts')
            );
            mkdirp.sync(
                this.templatePath('app/styles')
            );
            mkdirp.sync(
                this.templatePath('app/images')
            );
            this.fs.copy(
                this.templatePath('app/*.html'),
                this.destinationPath('app/')
            );
            this.fs.copy(
                this.templatePath('app/favicon.ico'),
                this.destinationPath('app/favicon.ico')
            );
            this.fs.copy(
                this.templatePath('app/robots.txt'),
                this.destinationPath('app/robots.txt')
            );
            this.fs.copy(
                this.templatePath('app/scripts/vendor/**'),
                this.destinationPath('app/scripts/vendor/')
            );
            if(this.includeRequireJS){
                this.fs.copy(
                    this.templatePath('app/scripts/requirejs/'),
                    this.destinationPath('app/scripts/'),
                    {
                        globOptions: {
                            dot:true
                        }
                    }
                );
            }else{
                this.fs.copy(
                    this.templatePath('app/scripts/norequirejs/'),
                    this.destinationPath('app/scripts/'),
                    {
                        globOptions: {
                            dot:true
                        }
                    }
                );
            }
            this.fs.write(
                this.destinationPath(path.join('app/'+this.entryIndex)),
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
                this.templatePath('server/app.js.ejs'),
                this.destinationPath('server/app.js'),
                {
                    includeSequelize:this.includeSequelize
                }
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
            if( !this.fs.exists(this.destinationPath('server/routes/'+this.serverRouteName+'.js')) ){
                this.fs.copyTpl(
                    this.templatePath('server/routes/api.js'),
                    this.destinationPath('server/routes/'+this.serverRouteName+'.js')
                );
            }
            if(this.includeSequelize){
                mkdirp.sync(
                    this.templatePath("server/sqldb")
                );
                this.fs.copy(
                    this.templatePath('server/sqldb/index.js'),
                    this.destinationPath('server/sqldb/index.js')
                );
            }
        },

        //composeTest: function () {
        //    if (['fullstack-backbone:app', 'fullstack-backbone'].indexOf(this.options.namespace) >= 0) {
        //        this.composeWith(this.cssUILib, {
        //            'skip-install': this.options['skip-install'],
        //            'skipMessage': false
        //        });
        //    }
        //}
    },

    install: function () {
        var shouldInstall = !this.options['skip-install'];
        var isInstallable = ['fullstack-backbone:app', 'fullstack-backbone'].indexOf(this.options.namespace) > -1;
        if (shouldInstall && isInstallable) {
            this.npmInstall();
            this.bowerInstall();
        }
    },
    end:function(){
        var skipInstall = this.options['skip-install'];
        if(skipInstall){
            return;
        }
        var bowerSassPath="";
        if( this.cssUILib!=="none" ){
            if(this.cssUILib==="sassMaterialize"){
                bowerSassPath="materialize/sass/**";
            }else if(this.cssUILib==="sassFoundation"){
                bowerSassPath="foundation/scss/**";
            }else if(this.cssUILib==="sassBootstrap"){
                bowerSassPath="bootstrap-sass-official/assets/stylesheets/**";
            }
            this.fs.copy(
                this.destinationPath( path.join("app/bower_components/"+bowerSassPath) ),
                path.join("app/styles/sass/")
            );
            if(this.cssUILib==="sassBootstrap"){
                this.fs.move(
                    this.destinationPath( path.join("app/styles/sass/_bootstrap.scss") ),
                    this.destinationPath( path.join("app/styles/sass/bootstrap.scss") )
                );
            }
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
