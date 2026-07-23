/* ---------------------------------------------------------------------------------------
api.types.ts
------------------------------------------------------------------------------------------ */

import type { JwtPayload } from "jsonwebtoken";

// custom interface for the token
export interface TokenPayload extends JwtPayload {
  _id: string;
  refreshTokenString: string;
}