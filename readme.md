# Backbone.js generator [![Build Status](https://travis-ci.org/pusongyang/generator-fullstack-backbone.svg?branch=master)](https://travis-ci.org/pusongyang/generator-fullstack-backbone) [![Coverage Status](https://coveralls.io/repos/github/pusongyang/generator-fullstack-backbone/badge.svg?branch=master)](https://coveralls.io/github/pusongyang/generator-fullstack-backbone?branch=master)

A Fullstack Backbone generator for Yeoman that provides a functional boilerplate Backbone app out of the box. You also get access to a number of sub-generators which can be used to easily create individual models, views, collections and so on.

Optional RequireJS (AMD) support has recently been added as a prompt when using the generator on new projects.

Features:
- 1) Front End,you can choose [RequireJS](http://requirejs.org/) or not.
- 2) Back End,we using [ExpressJs](http://expressjs.com/),redis,[mogoose](http://mongoosejs.com/),[Sequelize](http://docs.sequelizejs.com/en/latest/).
- 3) UI lib support,Sass(Compass):[Materialize](http://materializecss.com/),[Foundation5](http://foundation.zurb.com/sites/docs/v/5.5.3/),[Bootstrap](http://v3.bootcss.com/getting-started/).
- 4) grunt build,support offline Manifest.
- 5) grunt upload,support compress and publish package.(But you need development your own CMS server).

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

Also checkout this [NetTuts write-up](http://net.tutsplus.com/tutorials/javascript-ajax/building-apps-with-the-yeoman-workflow/) for a guide to building Backbone.js apps using this generator.


## Options
* `sequelize`
    mysql AR class,you can define your table like OOP in 'server/sqldb/yourClass.model.js' and use it like:
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

## Contribute

When submitting a bugfix, write a test that exposes the bug and fails before applying your fix. Submit the test alongside the fix.

When submitting a new feature, add tests that cover the feature.


## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
