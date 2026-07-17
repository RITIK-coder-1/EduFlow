/* ---------------------------------------------------------------------------------------
api.types.ts
------------------------------------------------------------------------------------------ */

import { JwtPayload } from "jsonwebtoken";

// custom interface for the token
interface TokenPayload extends JwtPayload {
  _id: string;
  refreshTokenString: string;
}

export { TokenPayload };
