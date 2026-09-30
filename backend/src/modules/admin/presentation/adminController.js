import { config } from '../../../config/env.js';
import { ApiResponse } from '../../../shared/utils/apiResponse.js';

export const adminLogin = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const inputUser = (username || email || '').trim().toLowerCase();
    const inputPass = (password || '').trim();

    const expectedUser = config.admin.username.toLowerCase();
    const expectedEmail = config.admin.email.toLowerCase();
    const expectedPass = config.admin.password;

    const userMatches = inputUser === expectedUser || inputUser === expectedEmail;
    const passMatches = inputPass === expectedPass;

    if (!userMatches || !passMatches) {
      return ApiResponse.error(res, 'Invalid admin username/email or password', 401);
    }

    // Generate secure admin token
    const tokenPayload = `${expectedUser}:${Date.now()}:${config.admin.tokenSecret}`;
    const token = Buffer.from(tokenPayload).toString('base64');

    return ApiResponse.success(res, {
      token,
      user: {
        username: config.admin.username,
        email: config.admin.email,
        role: 'SUPER_ADMIN',
      },
    }, 'Admin authenticated successfully');
  } catch (err) {
    next(err);
  }
};

export const verifyAdminSession = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return ApiResponse.error(res, 'Authentication token missing', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const parts = decoded.split(':');

    if (parts.length < 3 || parts[2] !== config.admin.tokenSecret) {
      return ApiResponse.error(res, 'Invalid or expired session token', 401);
    }

    return ApiResponse.success(res, {
      valid: true,
      username: config.admin.username,
      email: config.admin.email,
      role: 'SUPER_ADMIN',
    }, 'Session active');
  } catch (err) {
    next(err);
  }
};
