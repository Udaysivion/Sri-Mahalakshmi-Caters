/**
 * Admin Controller
 * Handles HTTP requests for analytics and authentication
 */

const adminService = require('./admin.service');

class AdminController {
  async getStats(req, res, next) {
    try {
      const stats = await adminService.getDashboardStats();
      res.json({
        success: true,
        stats
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const isValid = adminService.verifyCredentials(username, password);

      if (!isValid) {
        return res.status(401).json({
          success: false,
          message: 'Invalid administrator credentials.'
        });
      }

      res.json({
        success: true,
        message: 'Authentication successful.',
        user: {
          username,
          role: 'SUPER_ADMIN'
        }
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
