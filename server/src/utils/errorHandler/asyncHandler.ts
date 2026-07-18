/* ---------------------------------------------------------------------------------------
asyncHandler.ts
This is a special middleware to encapsulate efficient error handling for each asynchronous function
------------------------------------------------------------------------------------------ */

// I defined the asyncHandler as a generic because it was strictly asking for interfaces to be passed down as req.body only and did not accept them as parameters. Generic makes sure that it allows different types with a fallback to any instead of throwing errors.

import { RequestHandler } from "express";

function asyncHandler<P = any, ResBody = any, ReqBody = any, ReqQuery = any>(
  func: RequestHandler<P, ResBody, ReqBody, ReqQuery>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> {
  return (req, res, next) => {
    Promise.resolve(func(req, res, next)).catch((error: unknown) => {
      error instanceof Error
        ? console.error(`There was a problem: ${error.message}`)
        : console.error(`There was a problem: ${error}`);
      next(error);
    });
  };
}

export default asyncHandler;
