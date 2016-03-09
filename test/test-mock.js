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
    '    "serverRouteName": "api"',
    '  }',
    '}'
].join('\n');
describe('test-mock.js fullstack backbone generator ', function () {
    before(function (done) {
        var deps = [
            [helpers.createDummyGenerator(), 'mocha:app']
        ];
        helpers.run(path.join(__dirname, '../generators/app'))
            .inTmpDir(function () {
                fs.writeFileSync('.yo-rc.json', config);
            })
            .withOptions({skipInstall: true})
            .withPrompts({
                features: [],
                cssUILib: 'sassBootstrap',
                entryIndex:'index.html',
                serverRouteName:'api'
            })
            .withGenerators(deps)
            .on('end', function(){
                done();
            });
    });
    describe('create expected files', function () {
        it('check created files', function () {
            var expectedContent = [
                ['app/index.html', /bower_components\/mockjs\/dist\/mock\.js/],
                ['app/index.html', /scripts\/mock_inject\.js/]
            ];
            var expected = [
                'app/scripts/mock_inject.js'
            ];
            assert.file(expected);
            assert.fileContent(expectedContent);
        });
    });
});
