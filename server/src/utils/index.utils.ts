/* ---------------------------------------------------------------------------------------
index.utils.js
This is a centralized exporting file for every single utility
------------------------------------------------------------------------------------------ */

import ApiResponse from "./api/apiResponse.ts";
import ApiError from "./api/apiError.js";
import asyncHandler from "./errorHandler/asyncHandler.js";
import mailSender from "./otp/mailSender.js";
import generateOTP from "./otp/otpGenerator.js";
import generateRefreshTokenString from "./tokens/generateRefreshTokenString.js";
import {
  CloudinaryUploadResult,
  uploadOnCloudinary,
} from "./files/cloudinary.ts";
import deleteFromCloudinary from "./files/deleteFromCloudinary.js";
import calculateAge from "./additional/calculateAge.js";
import deleteCourse from "./additional/deleteCourse.js";

export {
  ApiResponse,
  ApiError,
  asyncHandler,
  mailSender,
  generateOTP,
  generateRefreshTokenString,
  uploadOnCloudinary,
  CloudinaryUploadResult,
  deleteFromCloudinary,
  calculateAge,
  deleteCourse,
};
