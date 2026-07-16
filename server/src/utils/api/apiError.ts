/* ---------------------------------------------------------------------------------------
apiError.ts
This is a class to send specific API error objects on failure 
------------------------------------------------------------------------------------------ */

class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errors: unknown[];

  constructor(
    statusCode: number,
    message: string = "API ERROR MESSAGE: Something went wrong!",
    errors: unknown[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;

    // using Error.captureStackTrace for clean stack traces in Node.js environments
    if (stack) {
      this.stack = stack;
    } else {
      // capture stack trace, starting from the function after the constructor
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
