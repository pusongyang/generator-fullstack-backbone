'use strict';

// Development specific configuration
// ==================================
module.exports = {
    db: {
        mongo: {
            uri:'mongodb://localhost/jiuyi'
        }
    },
    redis: {
        port: 6379,
        host: 'localhost',
        options: {
            detect_buffers: true
        }
    },
    appPath:"app",
    seedDB: false
};
