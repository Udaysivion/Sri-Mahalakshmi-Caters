/**
 * Dining Domain Routes
 */

const express = require('express');
const router = express.Router();
const diningController = require('./dining.controller');

router.post('/', (req, res, next) => diningController.create(req, res, next));
router.get('/', (req, res, next) => diningController.getAll(req, res, next));
router.patch('/:bookingId/status', (req, res, next) => diningController.updateStatus(req, res, next));

module.exports = router;
