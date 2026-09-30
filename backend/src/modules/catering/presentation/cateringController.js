import { ApiResponse } from '../../../shared/utils/apiResponse.js';

export class CateringController {
  constructor(cateringService) {
    this.cateringService = cateringService;
  }

  create = async (req, res, next) => {
    try {
      const inquiry = await this.cateringService.submitInquiry(req.body);
      return ApiResponse.created(
        res,
        inquiry,
        'Catering inquiry received. Our event manager will contact you shortly!'
      );
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req, res, next) => {
    try {
      const { eventType, status, phone } = req.query;
      const inquiries = await this.cateringService.listInquiries({ eventType, status, phone });
      return ApiResponse.success(res, inquiries, 'Catering inquiries retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  getById = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const inquiry = await this.cateringService.getInquiryById(id);
      return ApiResponse.success(res, inquiry, 'Catering inquiry retrieved successfully');
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { status } = req.body;
      const updated = await this.cateringService.updateStatus(id, status);
      return ApiResponse.success(res, updated, 'Catering inquiry status updated successfully');
    } catch (err) {
      next(err);
    }
  };
}
