/**
 * Feature: Orders → Payment
 * Service: Razorpay Standard Checkout integration
 *
 * Flow:
 *   1. Call backend POST /api/payment/create-order  → get server-side order_id
 *   2. Open Razorpay modal using that order_id
 *   3. On payment.success → call backend POST /api/payment/verify-payment
 *   4. Only on verified success → resolve with payment details
 *
 * The KEY_SECRET never touches the browser.
 */

let BACKEND_URL = (import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5001/api').replace(/\/+$/, '');
if (!BACKEND_URL.endsWith('/api')) { BACKEND_URL += '/api'; }

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || '';

/**
 * Dynamically loads the Razorpay checkout.js SDK if not already present.
 * Returns a promise that resolves when the script is ready.
 */
const loadRazorpaySDK = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(window.Razorpay);
    const existing = document.getElementById('razorpay-sdk');
    if (existing) {
      // Script tag exists but SDK may not be ready yet — wait for it
      existing.addEventListener('load', () => resolve(window.Razorpay));
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay SDK')));
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-sdk';
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(window.Razorpay);
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });

/**
 * Step 1: Ask the backend to create a Razorpay order.
 * @param {number} amountInPaise - e.g. 50000 for ₹500
 * @param {string} receipt       - Short order ref string
 */
const createBackendOrder = async (amountInPaise, receipt) => {
  const response = await fetch(`${BACKEND_URL}/payment/create-order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountInPaise, currency: 'INR', receipt })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || `Failed to create order (HTTP ${response.status})`);
  }

  return response.json(); // { success, order_id, amount, currency }
};

/**
 * Step 3: Verify the payment signature on the backend.
 * @param {string} razorpay_order_id
 * @param {string} razorpay_payment_id
 * @param {string} razorpay_signature
 */
const verifyBackendSignature = async (razorpay_order_id, razorpay_payment_id, razorpay_signature) => {
  const response = await fetch(`${BACKEND_URL}/payment/verify-payment`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature })
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || `Signature verification failed (HTTP ${response.status})`);
  }

  return response.json(); // { success, verified, message }
};

/**
 * Opens the Razorpay Standard Checkout modal.
 *
 * @param {object} options
 * @param {number} options.amountInRupees  - Total cart amount in ₹ (not paise)
 * @param {string} options.orderId         - Internal order reference (e.g. SMK-123456)
 * @param {string} options.customerName
 * @param {string} options.customerPhone
 * @param {string} options.restaurantName
 *
 * @returns {Promise<{razorpay_payment_id, razorpay_order_id, razorpay_signature}>}
 *   Resolves with verified payment details, rejects on failure or cancellation.
 */
export const initiateRazorpayCheckout = async ({
  amountInRupees,
  orderId,
  customerName = '',
  customerPhone = '',
  restaurantName = 'Sri Mahalakshmi Caters'
}) => {
  if (!amountInRupees || amountInRupees < 1) {
    throw new Error('Invalid amount. Minimum order value is ₹1.');
  }

  const amountInPaise = Math.round(amountInRupees * 100);

  // Load SDK
  await loadRazorpaySDK();

  // Create server-side Razorpay order
  const orderData = await createBackendOrder(amountInPaise, orderId);

  return new Promise((resolve, reject) => {
    const rzpOptions = {
      key: RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: restaurantName,
      description: `Order ${orderId}`,
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=120',
      order_id: orderData.order_id,  // CRITICAL: Razorpay server-side order id
      prefill: {
        name: customerName,
        contact: customerPhone
      },
      theme: {
        color: '#1B4332'
      },
      handler: async function (response) {
        // response = { razorpay_payment_id, razorpay_order_id, razorpay_signature }
        try {
          await verifyBackendSignature(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
          resolve(response); // verified
        } catch (verifyErr) {
          reject(verifyErr);
        }
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment cancelled by user.'));
        }
      }
    };

    const rzp = new window.Razorpay(rzpOptions);

    rzp.on('payment.failed', function (failureResponse) {
      reject(new Error(
        failureResponse.error?.description || 'Payment failed. Please try again.'
      ));
    });

    rzp.open();
  });
};
