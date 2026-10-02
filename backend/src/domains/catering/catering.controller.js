/**
 * Catering Controller
 * Handles HTTP requests and delegates to CateringService
 */

const cateringService = require('./catering.service');

class CateringController {
  async create(req, res, next) {
    try {
      const inquiry = await cateringService.submitInquiry(req.body);
      res.status(201).json({
        success: true,
        message: 'Catering event inquiry submitted and saved to PostgreSQL.',
        inquiry
      });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const inquiries = await cateringService.getAllInquiries();
      res.json({
        success: true,
        count: inquiries.length,
        inquiries
      });
    } catch (err) {
      next(err);
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { inquiryId } = req.params;
      const { status } = req.body;
      const updated = await cateringService.updateInquiryStatus(inquiryId, status);
      res.json({
        success: true,
        message: `Catering inquiry #${inquiryId} updated to ${status}`,
        inquiry: updated
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new CateringController();
