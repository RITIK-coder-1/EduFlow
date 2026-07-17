/* ----------------------------------------------------------------------------------------------
token.middleware.ts
This middleware verifies the access token of the users for each secured request
------------------------------------------------------------------------------------------------- */

import jwt from "jsonwebtoken";
import { User } from "../models/index.model.ts";
import { ApiError, asyncHandler } from "../utils/index.utils.ts";
import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "../types/api.types.ts";

const verifyJwtFunction = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const token: string =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", ""); // replace "Bearer <token>" to "<token>"

  if (!token) {
    console.error("Token Error: It is not verified.");

    throw new ApiError(401, "Unauthorized request");
  } // throw an error if there is no access token

  // decoding the payload of the token (only if it is valid)
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "");

  if (!decodedToken) {
    console.error("Token Error: invalid token.");

    throw new ApiError(400, "Invalid Token");
  }

  // the user
  const user = await User.findById((decodedToken as TokenPayload)?._id).select(
    "-password -refreshTokenString"
  );

  if (!user) {
    console.log("Token Error: The access token is Invalid!");

    throw new ApiError(401, "Invalid Access Token");
  } // if the user doesn't exist with the specific token

  req.user = user; // adding the user to the request object for later processing

  next();
};

const verifyJwt = asyncHandler(verifyJwtFunction);

export default verifyJwt;
