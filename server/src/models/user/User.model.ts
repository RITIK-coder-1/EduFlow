/* ---------------------------------------------------------------------------------------
User.model.ts
This file builds the user schema for defining the user data points
------------------------------------------------------------------------------------------ */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { UserContract } from "../../types/index.types.ts";

/* ---------------------------------------------------------------------------------------
The Schema 
------------------------------------------------------------------------------------------ */

const userSchema = new mongoose.Schema<UserContract>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      minlength: 6,
      maxlength: 30,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      unique: false,
      minlength: 10,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    accountType: {
      type: String,
      enum: ["Student", "Instructor", "Admin"],
      default: "Student",
      required: true,
    },
    profilePic: {
      type: String,
      default: "",
    },
    createdCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    lastCourseVisited: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      default: null,
    },
    totalRevenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    refreshTokenString: String,
  },
  {
    timestamps: true,
  }
);

/* ---------------------------------------------------------------------------------------
Hashing password before saving it to the document for security
------------------------------------------------------------------------------------------ */

async function hashPassword(this: UserContract): Promise<void> {
  if (!this.isModified("password")) {
    return; // If password hasn't been modified, skip hashing and move on.
  }

  // Perform hashing with error handling
  try {
    this.password = await bcrypt.hash(this.password, 10); // hash the passoword with 10 salt rounds
    console.log("User Model:  Password successfully hashed before saving.");
  } catch (error: unknown) {
    error instanceof Error
      ? console.error(
          "User Model Error:  Failed to hash password. ",
          error.message
        )
      : // If hashing fails, log the error and pass it to Mongoose to abort the save operation, preventing plain text data exposure.
        console.error("User Model Error:  Failed to hash password.", error);
    throw error; // Abort the save operation
  }
}

userSchema.pre<UserContract>("save", hashPassword);

/* ---------------------------------------------------------------------------------------
Custom Method to validate the user password for logging in purposes 
------------------------------------------------------------------------------------------ */

userSchema.methods.isPasswordCorrect = async function (
  this: UserContract,
  password: string
): Promise<boolean> {
  if (!this.password) {
    console.warn(
      "User Model Warning: Attempted to compare password on a document missing a hash."
    ); // if the stored password is missing
    return false;
  }
  try {
    // 'password' is the plain text string submitted by the user.
    // 'this.password' is the hashed string retrieved from the database document.
    return await bcrypt.compare(password, this.password);
  } catch (error: unknown) {
    error instanceof Error
      ? console.error(
          "Critical USER MODEL error during password comparison:",
          error.message
        )
      : // If the comparison fails due to a library error (e.g., malformed hash)
        console.error(
          "Critical USER MODEL error during password comparison:",
          error
        );
    return false;
  }
};

/* ---------------------------------------------------------------------------------------
Custom Method to generate the access and the refresh tokens
------------------------------------------------------------------------------------------ */

userSchema.methods.generateAccessToken = function (this: UserContract): string {
  const secret = process.env["ACCESS_TOKEN_SECRET"] || "";
  const expiry = process.env["ACCESS_TOKEN_EXPIRY"] || "";

  // Fail-fast configuration check
  if (!secret || !expiry) {
    console.error(
      "CRITICAL AUTH ERROR: ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY is undefined in environment variables."
    );
    throw new Error(
      "CRITICAL AUTH ERROR: ACCESS_TOKEN_SECRET or ACCESS_TOKEN_EXPIRY is undefined in environment variables."
    );
  }

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    secret as jwt.Secret,
    {
      expiresIn: expiry,
    } as jwt.SignOptions
  );
};

userSchema.methods.generateRefreshToken = function (
  this: UserContract,
  uniqueTokenString: string
): string {
  const secret = process.env["REFRESH_TOKEN_SECRET"];
  const expiry = process.env["REFRESH_TOKEN_EXPIRY"];

  // Fail-fast configuration check
  if (!secret || !expiry) {
    console.error(
      "CRITICAL AUTH ERROR: REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY is undefined in environment variables."
    );
    throw new Error(
      "CRITICAL AUTH ERROR: REFRESH_TOKEN_SECRET or REFRESH_TOKEN_EXPIRY is undefined in environment variables."
    );
  }

  return jwt.sign(
    {
      _id: this._id, // the id is saved for the refresh token
      uniqueToken: uniqueTokenString, // this unique string separates two distinct refresh tokens
    },
    secret as jwt.Secret,
    {
      expiresIn: expiry,
    } as jwt.SignOptions
  );
};

/* ---------------------------------------------------------------------------------------
The Model
------------------------------------------------------------------------------------------ */

const User = mongoose.model<UserContract>("User", userSchema);

export default User;
