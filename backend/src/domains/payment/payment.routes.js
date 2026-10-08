/**
 * Payment Domain Routes
 * POST /api/payment/create-order   — Creates a Razorpay server-side order
 * POST /api/payment/verify-payment — Verifies HMAC-SHA256 payment signature
 */

const express = require('express');
const router = express.Router();
const paymentController = require('./payment.controller');

router.post('/create-order', (req, res, next) => paymentController.createOrder(req, res, next));
router.post('/verify-payment', (req, res, next) => paymentController.verifyPayment(req, res, next));

module.exports = router;
