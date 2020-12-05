exports.SuccessResponse = class SuccessResponse {
  constructor(code, data, success = true) {
    this.success = success;
    this.code = code;
    this.data = data;
  }
};
