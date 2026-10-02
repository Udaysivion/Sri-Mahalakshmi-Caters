/**
 * Catering Domain Routes
 */

const express = require('express');
const router = express.Router();
const cateringController = require('./catering.controller');

router.post('/', (req, res, next) => cateringController.create(req, res, next));
router.get('/', (req, res, next) => cateringController.getAll(req, res, next));
router.patch('/:inquiryId/status', (req, res, next) => cateringController.updateStatus(req, res, next));

module.exports = router;
