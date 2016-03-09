'use strict';

var express = require('express');
var controller = require('./doctors.controller');
var router = express.Router();

router.get('/',    controller.index);
router.post('/',    controller.post);
router.put('/:id',    controller.put);
router.get('/:id',    controller.getById);
router.delete('/:id',    controller.rmById);

module.exports = router;
