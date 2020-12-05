exports.ErrorResponse = class ErrorResponse {
  constructor(code, message, success = false) {
    this.success = success;
    this.code = code;
    this.message = message;
  }
};
