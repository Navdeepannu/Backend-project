class ApiResponse {
  constructor(statusCode, data, message='Success') {
    this.statausCode = statausCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
