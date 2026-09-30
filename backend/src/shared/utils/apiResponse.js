export class ApiResponse {
  static success(res, data = null, message = 'Success', statusCode = 200, meta = null) {
    const payload = {
      success: true,
      message,
      data,
    };
    if (meta) {
      payload.meta = meta;
    }
    return res.status(statusCode).json(payload);
  }

  static created(res, data = null, message = 'Created successfully') {
    return this.success(res, data, message, 201);
  }

  static error(res, message = 'An error occurred', statusCode = 500, details = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      ...(details ? { details } : {}),
    });
  }
}
