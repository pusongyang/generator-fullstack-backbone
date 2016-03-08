/**
 * Main application routes
 * Don't remove the insertFlag
 */

'use strict';

module.exports = function (app) {
    //Insert routes below {{insertFlag}}
    app.use('/doctors',require('./../api/doctors/index'));
};
