/*global describe:true, beforeEach:true, it:true */
'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var fs = require('fs');
var test = require('./helper.js');

var config = [
    '{',
    '  "generator-fullstack-backbone": {',
    '    "appName": "Temp",',
    '    "includeRequireJS": false,',
    '    "includeModernizr": false,',
    '    "cssUILib": "sassBootstrap",',
    '    "serverRouteName": "api",',
    '    "entryIndex": "index.html"',
    '  }',
    '}'
].join('\n');
describe('fullstack backbone generator:all', function () {
    beforeEach(function (done) {
        var deps = [
            path.join(__dirname, '../generators/collection'),
            path.join(__dirname, '../generators/model'),
            path.join(__dirname, '../generators/view'),
            [helpers.createDummyGenerator(), 'mocha:app']
        ];
        helpers.run(path.join(__dirname, '../generators/all'))
            .inTmpDir(function () {
                fs.writeFileSync('.yo-rc.json', config);
            })
            .withArguments(['foo'])
            .withGenerators(deps)
            .on('end', done);
    });
    describe('creates all', function () {
        it('without failure', function () {
            var expectedContent = [
                ['app/scripts/models/foo.js', /Models.Foo = Backbone.Model.extend\(\{/],
                ['server/models/foo.model.js', /var FooSchema = new Schema\(\{/],
                ['app/scripts/collections/foos.js', /Collections.Foos = Backbone.Collection.extend\(\{/],
                ['server/api/foos/index.js', /module.exports = router/],
                ['server/routes/api.js', /app.use\(\'\/foos\'/],
                ['app/scripts/views/foo.js', /Views.Foo = Backbone.View.extend\(\{(.|\n)*app\/scripts\/templates\/foo.ejs/]
            ];
            assert.file('app/scripts/templates/foo.ejs');
            assert.fileContent(expectedContent);
        });
    });
});
