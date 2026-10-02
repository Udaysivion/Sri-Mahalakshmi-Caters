/**
 * Global Error Handler Middleware
 * Sanitizes stack traces in production to protect system internals.
 */

const env = require('../config/env');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`❌ [${req.method} ${req.url}] Error:`, err);

  res.status(statusCode).json({
    success: false,
    message,
    ...(env.isProduction ? {} : { stack: err.stack })
  });
};

module.exports = errorHandler;
