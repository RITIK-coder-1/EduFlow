/* ---------------------------------------------------------------------------------------
app.js
This is the main backend application 
------------------------------------------------------------------------------------------ */

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";
import { ApiError } from "./utils/index.utils.ts";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express(); // the express app
const jsonlimit = "16kb"; // setting the JSON limit for accepting data

/* ---------------------------------------------------------------------------------------
Setting the HTTP headers for security 
------------------------------------------------------------------------------------------ */

app.use(helmet());

/* ---------------------------------------------------------------------------------------
Setting the CORS origin for allowing the client to talk to my server
------------------------------------------------------------------------------------------ */

// all the allowed origins for my application
const allowedOrigins: string[] = [
  "http://localhost:5173", // My React App's current development server
  "http://localhost:3000", // The origin the server was previously allowing
  "http://127.0.0.1:5173", // A good practice for comprehensive localhost coverage
  process.env.VERCEL_CLIENT || "", // the vercel client
];

// the function to filter origins
const corsFunction = (
  origin: string | undefined, // Origin can be undefined for non-browser requests
  callback: (err: Error | null, allow?: boolean) => void
) => {
  // Allowing requests with no origin (like mobile apps, curl, postman)
  if (!origin) {
    return callback(null, true);
  }

  // Checking if the origin is in my whitelist
  if (allowedOrigins.indexOf(origin) !== -1) {
    return callback(null, true); // Allowed
  } else {
    // Denying access
    const message = `CORS ERROR: The CORS policy of this site doesn't allow requests from this specific origin: ${origin}`;
    return callback(new Error(message), false);
  }
};

// Setting up the CORS policy
app.use(
  cors({
    origin: corsFunction,
    credentials: true,
  })
);

/* ---------------------------------------------------------------------------------------
Parsing the different datatypes to effectively add it to the request body
------------------------------------------------------------------------------------------ */

// JSON data
app.use(express.json({ limit: jsonlimit }));

// URLs and Form Data (for files)
app.use(
  express.urlencoded({
    limit: jsonlimit,
    extended: true, // parsing nested objects too
  })
);

// Cookies
app.use(cookieParser());

/* ---------------------------------------------------------------------------------------
Serving the static files (for temporary file uploads to the server)
------------------------------------------------------------------------------------------ */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "..", "public");

// just in case the folder doesn't exist in the repo
const tempPath = path.join(path.resolve(), "public", "temp");
if (!fs.existsSync(tempPath)) {
  fs.mkdirSync(tempPath, { recursive: true });
  console.log("Created missing temp directory at:", tempPath);
}

app.use("/static", express.static(publicPath));

/* ---------------------------------------------------------------------------------------
All the routes will go here
------------------------------------------------------------------------------------------ */

import {
  userRouter,
  adminRouter,
  courseRouter,
  authRouter,
  instructorRouter,
} from "./routes/index.routes.js";

app.get("/api/v1", (_, res) => {
  res.send("The server is successfully running!");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/instructor", instructorRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", courseRouter);

/* ---------------------------------------------------------------------------------------
Error Handling 
------------------------------------------------------------------------------------------ */

// Error handler for non-existant routes
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.error("APP ERROR: invalid resource requested!");
  next(
    new ApiError(
      404,
      `The requested resource was not found at ${req.originalUrl}`
    )
  );
});

// Global Error Handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  // Check if the error coming in is a JWT error
  if (error.name === "TokenExpiredError") {
    error = new ApiError(403, "Token has expired");
  }
  if (error.name === "JsonWebTokenError") {
    error = new ApiError(401, "Token is invalid");
  }

  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error.message || "CRITICAL: Internal Server Error";

  console.error("CRITICAL SYSTEM ERROR: ", error);

  res.status(statusCode).json({
    success: false,
    message,
    error: process.env.NODE_ENV === "development" ? error : undefined, // Full error object for debugging (only in development)
  });
});

export default app;
