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
    '    "includeSequelize": true,',
    '    "includeRequireJS": false,',
    '    "includeModernizr": false,',
    '    "cssUILib": "sassBootstrap",',
    '    "serverRouteName": "api",',
    '    "entryIndex": "index.html"',
    '  }',
    '}'
].join('\n');
describe('fullstack backbone generator ', function () {
    beforeEach(function (done) {
        var deps = [
            [helpers.createDummyGenerator(), 'mocha:app']
        ];
        helpers.run(path.join(__dirname, '../generators/app'))
            .inTmpDir(function () {
                fs.writeFileSync('.yo-rc.json', config);
            })
            .withOptions({skipInstall: true})
            .withPrompts({
                features: ['sequelize']
            })
            .withGenerators(deps)
            .on('end', done);
    });
    describe('create expected files', function () {
        it('check created files', function () {
            var expectedContent = [
                ['server/config/environment/development.js', /mysql: \{/],
                ['server/app.js', /var models = require\("\.\/sqldb"\)/],
                ['package.json', /"mysql": "\^2\.10\.2",/]
            ];
            var expected = [
                'server/sqldb/index.js'
            ];
            assert.file(expected);
            assert.fileContent(expectedContent);
        });
    });

    describe('creates model', function () {
        it('without failure', function (done) {
            test.createSubGenerator(config, 'model', function () {
                var expectedContent = [
                    ['server/sqldb/foo.model.js', /var Foo = sequelize\.define\("Foo", \{/]
                ];
                assert.fileContent(expectedContent);
                done();
            });
        });
    });
});
