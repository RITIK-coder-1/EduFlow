// base API response
export interface BaseApiResponse {
  success: boolean;
  statusCode: number;
  message: string;
}

// error response
export interface ApiErrorResponse extends BaseApiResponse {
  success: false;
  data?: never; // Ensures data cannot be passed in an error response
}

// success response
export interface ApiSuccessResponse<T> extends BaseApiResponse {
  success: true;
  data: T;
}
