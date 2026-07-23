/* ---------------------------------------------------------------------------------------
index.utils.ts
This is a centralized exporting file for every single utility
------------------------------------------------------------------------------------------ */

import ApiResponse from "./api/apiResponse.ts";
import ApiError from "./api/apiError.ts";
import asyncHandler from "./errorHandler/asyncHandler.ts";
import mailSender from "./otp/mailSender.ts";
import generateOTP from "./otp/otpGenerator.ts";
import generateRefreshTokenString from "./tokens/generateRefreshTokenString.ts";
import {
  type CloudinaryUploadResult,
  uploadOnCloudinary,
} from "./files/cloudinary.ts";
import deleteFromCloudinary from "./files/deleteFromCloudinary.ts";
import calculateAge from "./additional/calculateAge.ts";
import deleteCourse from "./additional/deleteCourse.ts";

export {
  ApiResponse,
  ApiError,
  asyncHandler,
  mailSender,
  generateOTP,
  generateRefreshTokenString,
  uploadOnCloudinary,
  type CloudinaryUploadResult,
  deleteFromCloudinary,
  calculateAge,
  deleteCourse,
};
