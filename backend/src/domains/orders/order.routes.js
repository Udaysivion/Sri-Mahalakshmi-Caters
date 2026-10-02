/**
 * Orders Domain Routes
 */

const express = require('express');
const router = express.Router();
const orderController = require('./order.controller');

router.post('/', (req, res, next) => orderController.create(req, res, next));
router.get('/', (req, res, next) => orderController.getAll(req, res, next));
router.patch('/:orderId/status', (req, res, next) => orderController.updateStatus(req, res, next));

module.exports = router;
