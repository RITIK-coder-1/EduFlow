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

// RTKQ response contract for transforming data
export interface ResponseContract<T = never> {
  data?: T; // Only error responses won't provide the data so it should be never if none is provided
  message: string;
}

// Defining an interface for the Request Body
export interface RegisterRequestBody {
  firstName: string;
  lastName?: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
  accountType: "Instructor" | "Student";
  userOTP?: string;
  profilePic?: File | null | string;
}
