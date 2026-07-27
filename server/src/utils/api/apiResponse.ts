/* ---------------------------------------------------------------------------------------
apiResponse.ts
This is a class to send specific API JSON objects on success 
------------------------------------------------------------------------------------------ */

import { ApiSuccessResponse } from "../../types/index.types.ts";

class ApiResponse<T> implements ApiSuccessResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  success: true = true;

  constructor(statusCode: number, message: string, data: T) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
