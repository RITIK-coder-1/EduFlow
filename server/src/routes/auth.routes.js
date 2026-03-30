/* ---------------------------------------------------------------------------------------
auth.routes.js
All the routes for auth flows 
------------------------------------------------------------------------------------------ */

import { Router } from "express";
import { upload, verifyJwt } from "../middleware/index.middleware.js";
import {
  registerUser,
  createRegisterOtp,
  loginUser,
  logoutUser,
  newAccessToken,
} from "../controllers/auth.controllers.js";

const router = Router();

/* ---------------------------------------------------------------------------------------
SPECIFIC ROUTES:

- Create OTP for register route 
- OTP validation and register route
- login route
- New Token 
- Logout user
------------------------------------------------------------------------------------------ */

// PUBLIC ROUTES

router
  .route("/register-otp")
  .post(upload.single("profilePic"), createRegisterOtp); // validate data and generate an OTP
router.route("/register").post(registerUser); // validate the OTP and register the user
router.route("/login").post(loginUser); // login the user
router.route("/token").post(newAccessToken); // generate a new access token after expiration

// SECURED ROUTE
router.route("/logout").post(verifyJwt, logoutUser); // log the user out

export { router as authRouter };
