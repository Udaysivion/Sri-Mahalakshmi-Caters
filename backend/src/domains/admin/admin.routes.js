/**
 * Admin Domain Routes
 */

const express = require('express');
const router = express.Router();
const adminController = require('./admin.controller');

router.get('/stats', (req, res, next) => adminController.getStats(req, res, next));
router.post('/login', (req, res, next) => adminController.login(req, res, next));

module.exports = router;
