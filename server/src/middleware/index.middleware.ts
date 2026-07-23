/* ---------------------------------------------------------------------------------------
index.middleware.ts
This is a centralized exporting file for every single middleware
------------------------------------------------------------------------------------------ */

import verifyJwt from "./token.middleware.ts";
import upload from "./multer.middleware.ts";
import { isAdmin, isInstructor } from "./owner.middleware.ts";

export { verifyJwt, upload, isAdmin, isInstructor };
