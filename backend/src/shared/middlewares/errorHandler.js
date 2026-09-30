import { AppError } from '../errors/AppError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { config } from '../../config/env.js';

export const errorHandler = (err, req, res, next) => {
  // Check if it's a known domain / application error
  if (err instanceof AppError) {
    return ApiResponse.error(res, err.message, err.statusCode, err.details);
  }

  // Handle Postgres unique constraint violation
  if (err.code === '23505') {
    return ApiResponse.error(res, 'Duplicate record found. Value must be unique.', 409, {
      detail: err.detail,
    });
  }

  // Handle Postgres foreign key violation
  if (err.code === '23503') {
    return ApiResponse.error(res, 'Referenced entity does not exist.', 400, {
      detail: err.detail,
    });
  }

  // Handle invalid UUID or syntax in Postgres
  if (err.code === '22P02') {
    return ApiResponse.error(res, 'Invalid parameter format or type.', 400);
  }

  // Fallback for unexpected internal server errors
  console.error('[Unhandled Error]:', err);

  const message = config.isProduction ? 'Internal Server Error' : err.message;
  return ApiResponse.error(res, message, 500, config.isProduction ? null : { stack: err.stack });
};
