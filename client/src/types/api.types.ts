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
  profilePic?: string;
}
