/*global describe:true, beforeEach:true, it:true */
'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = yeoman.test;
var assert = yeoman.assert;
var fs = require('fs');
var test = require('./helper.js');

describe('test-requirejs.js fullstack backbone generator ', function () {
    beforeEach(function (done) {
        var deps = [
            [helpers.createDummyGenerator(), 'mocha:app']
        ];
        helpers.run(path.join(__dirname, '../generators/app'))
            .withArguments(['temp'])
            .withOptions({skipInstall: true})
            .withPrompts({
                features: ['requirejs'],
                cssUILib: 'sassMaterialize'
            })
            .withGenerators(deps)
            .on('end', done);
    });
    describe('create expected files', function () {
        it('check created files', function () {
            var expectedContent = [
                ['app/scripts/routes/all.js', /new DoctorView/],
                ['bower.json', /"name": "Temp"/],
                ['Gruntfile.js', /'compass:server'/]
            ];
            var expected = [
                'app/404.html',
                'app/500.html',
                'app/favicon.ico',
                'app/robots.txt',
                '.gitignore',
                '.bowerrc',
                '.editorconfig',
                '.yo-rc.json',
                'app/scripts/main.js',
                'app/scripts/collections/doctors.js',
                'app/scripts/models/doctor.js',
                'app/scripts/views/doctor.js',
                'app/scripts/templates/doctor.ejs',
                'app/styles/sass/main.scss',
                'server/api/doctors/doctors.controller.js',
                'server/app.js',
                'server/config/express.js',
                'server/config/seed.js',
                'server/config/environment/development.js',
                'server/config/environment/index.js',
                'server/models/doctor.model.js',
                'test/app/collections/doctors.spec.js',
                'test/app/models/doctor.spec.js',
                'test/app/views/doctor.spec.js',
                'test/server/doctor.spec.js',
                'karma.conf.js',
                'pm2.json'
            ];

            assert.file(expected);
            assert.fileContent(expectedContent);
        });
    });
});
