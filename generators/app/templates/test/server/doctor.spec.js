'use strict';

var app = require('../../server/app.js');
var request=require('supertest');
var chai = require('chai');
// Load Chai assertions
global.expect = chai.expect;

describe('Doctors API:', function() {
    var newDoctor,
        expressServerApp=request(app);
    describe('GET /doctors', function() {
        var doctors;
        beforeEach(function(done) {
            expressServerApp
                .get('/doctors')
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) {
                        return done(err);
                    }
                    doctors = res.body;
                    done();
                });
        });
        it('should respond with JSON array', function() {
            console.log(doctors);
            expect(doctors).to.have.property("msg");
            expect(doctors.msg).to.be.instanceOf(Array);
        });
    });

    describe('POST /doctors', function() {
        beforeEach(function(done) {
            expressServerApp
                .post('/doctors')
                .send({
                    'email': 'test@turingcat.com',
                    'name':'Doctor Test'
                })
                .expect(201)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) {
                        return done(err);
                    }
                    newDoctor = res.body.msg;
                    done();
                });
        });
        it('should respond with the newly created doctor', function() {
            expect(newDoctor.email).to.be.equal('test@turingcat.com');
            expect(newDoctor.name).to.be.equal('Doctor Test');
        });
    });

    describe('GET /doctors/:id', function() {
        var doctor;
        beforeEach(function(done) {
            expressServerApp
                .get('/doctors/' + newDoctor._id)
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res){
                    if (err) {
                        return done(err);
                    }
                    doctor = res.body.msg;
                    done();
                });
        });
        afterEach(function() {
            doctor = {};
        });
        it('should respond with the newly doctor', function() {
            expect(doctor.email).to.be.equal('test@turingcat.com');
            expect(doctor.name).to.be.equal('Doctor Test');
        });
    });

    describe('PUT /doctors/:id', function() {
        var updatedDoctor;
        beforeEach(function(done) {
            expressServerApp
                .put('/doctors/' + newDoctor._id)
                .send({
                    'email': 'test2@turingcat.com',
                    'name':'Doctor2 Test'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function(err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedDoctor = res.body.msg;
                    done();
                });
        });
        afterEach(function() {
            updatedDoctor = {};
        });
        it('should respond with the updated thing', function() {
            expect(updatedDoctor.email).to.be.equal('test2@turingcat.com');
            expect(updatedDoctor.name).to.be.equal('Doctor2 Test');
        });
    });

    describe('DELETE /doctors/:id', function() {
        it('should respond with 204 on successful removal', function(done) {
            expressServerApp
                .delete('/doctors/' + newDoctor._id)
                .expect(204)
                .end(function(err, res){
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
        it('should respond with 404 when thing does not exist', function(done) {
            expressServerApp
                .delete('/doctors/' + newDoctor._id)
                .expect(404)
                .end(function(err, res){
                    if (err) {
                        return done(err);
                    }
                    done();
                });
        });
    });
});
