/**
 * Payment Domain Controller
 * Handles HTTP layer for Razorpay checkout endpoints.
 */

const paymentService = require('./payment.service');

class PaymentController {
  /**
   * POST /api/payment/create-order
   * Body: { amount (paise), currency?, receipt? }
   */
  async createOrder(req, res, next) {
    try {
      const { amount, currency, receipt } = req.body;
      const result = await paymentService.createOrder({ amount, currency, receipt });
      res.status(201).json({
        success: true,
        ...result
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * POST /api/payment/verify-payment
   * Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
   */
  async verifyPayment(req, res, next) {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const result = paymentService.verifySignature({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      });
      res.json({
        success: true,
        message: 'Payment verified successfully.',
        ...result
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/payment/razorpay-key
   * Returns the Razorpay Key ID
   */
  getKey(req, res) {
    res.json({ key: process.env.RAZORPAY_KEY_ID });
  }
}

module.exports = new PaymentController();
