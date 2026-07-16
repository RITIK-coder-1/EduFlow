// the file to include global types

import { UserContract } from "../models/index.model.ts";

declare global {
  namespace Express {
    interface Request {
      user?: UserContract;
    }
  }
}
