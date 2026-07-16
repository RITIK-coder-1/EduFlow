/* ---------------------------------------------------------------------------------------
apiResponse.table-captions
This is a class to send specific API JSON objects on success 
------------------------------------------------------------------------------------------ */

class ApiResponse {
  statusCode: number;
  message: string;
  data: unknown;
  success: boolean;

  constructor(statusCode: number, message: string = "success", data: unknown) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400; // TRUE // the status codes should be less than 400 to represent success
  }
}

export default ApiResponse;
