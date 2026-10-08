/**
 * Payment Domain Service
 * Handles Razorpay Standard Checkout: order creation & signature verification.
 * KEY_SECRET never leaves this file — it is never sent to the frontend.
 */

const Razorpay = require('razorpay');
const crypto = require('crypto');
const env = require('../../config/env');

// Lazily initialise the Razorpay SDK instance so the server can still start
// even if credentials are temporarily missing (non-fatal in dev).
let razorpayInstance = null;
const getRazorpay = () => {
  if (!razorpayInstance) {
    if (!env.razorpay.keyId || !env.razorpay.keySecret) {
      const err = new Error('Razorpay credentials are not configured on the server.');
      err.statusCode = 500;
      throw err;
    }
    razorpayInstance = new Razorpay({
      key_id: env.razorpay.keyId,
      key_secret: env.razorpay.keySecret
    });
  }
  return razorpayInstance;
};

class PaymentService {
  /**
   * Creates a Razorpay order.
   * @param {number} amount  - Amount in paise (INR × 100). Minimum: 100.
   * @param {string} currency - e.g. 'INR'
   * @param {string} receipt  - Short receipt / order reference string.
   * @returns {{ order_id, amount, currency }}
   */
  async createOrder({ amount, currency = 'INR', receipt }) {
    if (!amount || amount < 100) {
      const err = new Error('Amount must be at least ₹1 (100 paise).');
      err.statusCode = 400;
      throw err;
    }

    const rzp = getRazorpay();

    let razorpayOrder;
    try {
      razorpayOrder = await rzp.orders.create({
        amount: Math.round(amount),  // paise, must be integer
        currency,
        receipt: receipt || `SMK-${Date.now().toString().slice(-8)}`,
        payment_capture: 1           // auto-capture on successful payment
      });
    } catch (rzpErr) {
      console.error('Razorpay create order error:', rzpErr);
      const err = new Error(rzpErr.error?.description || 'Failed to create Razorpay order.');
      err.statusCode = rzpErr.statusCode || 500;
      throw err;
    }

    return {
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency
    };
  }

  /**
   * Verifies the Razorpay payment signature using HMAC-SHA256.
   * @param {string} razorpay_order_id
   * @param {string} razorpay_payment_id
   * @param {string} razorpay_signature  - Sent by Razorpay SDK on success.
   * @returns {{ verified: boolean }}
   */
  verifySignature({ razorpay_order_id, razorpay_payment_id, razorpay_signature }) {
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      const err = new Error('razorpay_order_id, razorpay_payment_id and razorpay_signature are all required.');
      err.statusCode = 400;
      throw err;
    }

    if (!env.razorpay.keySecret) {
      const err = new Error('Server misconfiguration: Razorpay key secret is missing.');
      err.statusCode = 500;
      throw err;
    }

    // Algorithm: HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', env.razorpay.keySecret)
      .update(body)
      .digest('hex');

    const signaturesMatch = expectedSignature === razorpay_signature;

    if (!signaturesMatch) {
      const err = new Error('Payment signature verification failed. Do not mark this order as paid.');
      err.statusCode = 400;
      throw err;
    }

    return { verified: true };
  }
}

module.exports = new PaymentService();
