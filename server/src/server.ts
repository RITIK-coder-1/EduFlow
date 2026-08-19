/* ---------------------------------------------------------------------------------------
server.ts
This is the entry point of our server
------------------------------------------------------------------------------------------ */

import "dotenv/config";
import app from "./app.ts";
import connectDB from "./db/index.ts";

/* ---------------------------------------------------------------------------------------
All the variables of the file
------------------------------------------------------------------------------------------ */

const port = Number(process.env.PORT) || 3001;

/* ---------------------------------------------------------------------------------------
Connecting to the database and listening as the server
------------------------------------------------------------------------------------------ */

try {
  await connectDB();
  app.listen(port, "0.0.0.0", () => {
    console.log(`The server is successfully listening on port ${port}`);
  });
} catch (error) {
  console.error(
    "CRITICAL ERROR: There was a problem while connecting to the server!",
    error
  );
}
