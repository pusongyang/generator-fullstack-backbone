'use strict';

// Development specific configuration
// ==================================
module.exports = {
    db: {
        mysql: {
            host: 'localhost',
            dialect: 'mysql',//'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql'
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            },
            user: 'root',
            password: '',
            database:'test'
        },
        mongo: {
            uri:'mongodb://localhost/test'
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
    seedDB: true
};
