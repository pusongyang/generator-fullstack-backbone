# Backbone.js generator [![Build Status](https://travis-ci.org/pusongyang/generator-fullstack-backbone.svg?branch=master)](https://travis-ci.org/pusongyang/generator-fullstack-backbone) [![Coverage Status](https://coveralls.io/repos/github/pusongyang/generator-fullstack-backbone/badge.svg?branch=master)](https://coveralls.io/github/pusongyang/generator-fullstack-backbone?branch=master)

A Fullstack Backbone generator for Yeoman that provides a functional boilerplate Backbone app out of the box. You also get access to a number of sub-generators which can be used to easily create individual models, views, collections and so on.
- The Good Part: Backbone help you module your javascript code.Good for maintain and readable. Multi-SASS lib. MVC both front end and back end.
- The bad Part: More code for the module and MVC and test. Only support IE9+.

Optional RequireJS (AMD) support has recently been added as a prompt when using the generator on new projects.

Features:
- 1) Front End,you can choose [RequireJS](http://requirejs.org/) or not.
- 2) Back End,we using [ExpressJs](http://expressjs.com/),redis,[mogoose](http://mongoosejs.com/),[Sequelize](http://docs.sequelizejs.com/en/latest/).
- 3) UI lib support,Sass(Compass):[Materialize](http://materializecss.com/),[Foundation5](http://foundation.zurb.com/sites/docs/v/5.5.3/),[Bootstrap](http://v3.bootcss.com/getting-started/).
- 4) `grunt build`,support offline Manifest.
- 5) `grunt upload`,support compress and publish package.(But you need development your own CMS server).
- 6) `grunt test`,run test [karma](https://karma-runner.github.io/) for client side code ; [mocha](http://mochajs.org/) for server side code.
- 7) Browser Support(It's also limited by the UI lib your choose):IE9+,FireFox4+,Safari5+,Chrome7+;
- 8) [Mockjs](http://mockjs.com/)(app/scripts/mock_inject.js),hijack your ajax in develop environment.Split FE&BE.

Base on:
- 1) [redis](http://redis.io/) for fast RAM cache data and session.
- 2) [mongodb](https://docs.mongodb.com/) for NO-SQL DB.
- 3) [mysql](https://www.mysql.com/) most popular SQL DB.
- 2) [compass](http://compass-style.org/) more function and mixin for [SASS](http://sass-lang.com/) for CSS extension language.


## Usage

Install: `npm install -g yo grunt bower generator-fullstack-backbone`

Make a new directory and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo fullstack-backbone`, optionally passing an app name:
```
yo fullstack-backbone [app-name]
```

Run `yo fullstack-backbone:all portal`,portal is the name of your new action:
```
yo fullstack-backbone:all [action]
```

Run `grunt serve`,start your backbone fullstack trip(The server start need redis and mongoDB).
```
grunt serve
```

## Generators

Available generators:

- fullstack-backbone:model
- fullstack-backbone:view
- fullstack-backbone:collection
- fullstack-backbone:all

## Typical workflow

```
yo fullstack-backbone # generates your application base and build workflow
yo fullstack-backbone:all blog
grunt serve
```
After these commands,your blog base code will be generated.But you still need do some work to make it show on the screen.
- 1) Open app/scripts/routes/all.js.
- 2) Add your blog view in the backbone routes.
- 3) Add href to this routes.eg: ``` http://localhost/index.html#blog ```

Also checkout this [NetTuts write-up](http://net.tutsplus.com/tutorials/javascript-ajax/building-apps-with-the-yeoman-workflow/) for a guide to building Backbone.js apps using this generator.


## Options
* `sequelize`
    mysql ORM for nodejs,you can define your table like OOP in 'server/sqldb/yourClass.model.js' and use it like:
```
var models  = require('../sqldb');
models.User.findAll({}).then(function(users) {
    res.render('index', {
        title: 'Express',
        users: users
    });
});
```
* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after
  scaffolding has finished.By default this value is false.


## A note regarding JST templates and strict mode

If you use strict mode in your app and JST templates the default grunt-jst implementation will cause your app to error out as the templates will be precompiled using a 'with' statement.

This can be addressed by changing the jst grunt task as follows:

```
jst: {
    compile: {
        options:
        {
            templateSettings:
            {
                variable: 'data'
            }
        },
        files: {
            '.tmp/scripts/templates.js': ['<%= yeoman.app %>/scripts/templates/*.ejs']
        }
    }
},
```
A result of this change is that your template variable definitions must also be updated from `<%= templateVariable %>` to `<%= data.templateVariable %>`. More information on this can be found in the [Underscore documentation](http://underscorejs.org/#template).

## Folder & Files structure explain:
```
app(for browser side files)：
	bower_components:bower depends libs。
	images:put your images here。
	scripts(backbone MVC & libs)：
		collections:backbone collections。
		helpers:backbone helpers。
		models:backbone models。
		routes:backbone routes。
		templates:backbone templates。
		vendor:common libs。
		views:backbone views。
dist:build folder。
node_modules:nodejs depends libs。
server(for express server side files):
    api:RESTful controller
    config:express server config
    models:OOP DB models
    routes:RESTful routes
    app.js:express server start scripts
    helper.js:commonJS for server common helper
test(test files)。
.bowerrc:bower config。
.editorconfig:IDE common config。
.gitattributes:Git attributes config。
.jshintrc:jshint javascript coding style。
.yo-rc.json:yoman generator config。
bower.json:bower config。
config.rb:ruby config for compass。
gruntfile.js: grunt config for grunt running scripts。
package.json:nodejs config。
pm2.json:for pm2 maintain your project on server.
karma.conf.js: karma test config.
```
## Contribute

When submitting a bugfix, write a *test* that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
