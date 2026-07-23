/* ---------------------------------------------------------------------------------------
global.types.ts 
To include global types 
------------------------------------------------------------------------------------------ */

import { UserContract } from "./user.types.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserContract;
    }
  }
}
