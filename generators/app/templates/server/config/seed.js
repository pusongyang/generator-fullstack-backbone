/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Doctor = require("../models/doctor.model.js");


Doctor.find({}).remove(function() {
    Doctor.create({
        name: 'Seed User',
        email: 'seed@test.com',
        image: 'http://'
    });
});
