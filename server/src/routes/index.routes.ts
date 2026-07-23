/* ---------------------------------------------------------------------------------------
index.routes.ts
A single exporting file for all the routes 
------------------------------------------------------------------------------------------ */

import { authRouter } from "./auth.routes.ts";
import { userRouter } from "./user.routes.ts";
import { courseRouter } from "./course.routes.ts";
import { adminRouter } from "./admin.routes.ts";
import { instructorRouter } from "./instructor.routes.ts";


export { authRouter, userRouter, courseRouter, adminRouter, instructorRouter };
