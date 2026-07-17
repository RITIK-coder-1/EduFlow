/* ---------------------------------------------------------------------------------------
asyncHandler.ts
This is a special middleware to encapsulate efficient error handling for each asynchronous function
------------------------------------------------------------------------------------------ */

import { Request, Response, NextFunction, RequestHandler } from "express";

function asyncHandler(func: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error: unknown) {
      error instanceof Error
        ? console.error(`There was a problem: ${error.message}`)
        : console.error(`There was a problem: ${error}`);
      next(error); // passing the error to the global error handler
    }
  };
}

export default asyncHandler;
