/**
 * Application Environment Configuration
 * Centralized, validated environment variables.
 * All secrets and credentials must be read from process.env.
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
require('dotenv').config();

const env = {
  port: parseInt(process.env.PORT, 10) || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  admin: {
    email: process.env.ADMIN_EMAIL,
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
    altPassword: process.env.ADMIN_ALT_PASSWORD
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET
  }
};

if (!env.databaseUrl) {
  console.warn('⚠️ WARNING: DATABASE_URL is not defined in environment variables!');
}

if (!env.razorpay.keyId || !env.razorpay.keySecret) {
  console.warn('⚠️ WARNING: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is not defined in environment variables!');
}

module.exports = env;
