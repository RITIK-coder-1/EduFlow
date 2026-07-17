/* ---------------------------------------------------------------------------------------
user.types.ts
------------------------------------------------------------------------------------------ */

import mongoose, { Document } from "mongoose";

type AccountType = "Student" | "Instructor" | "Admin";

interface UserDomain {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: Date;
  accountType: AccountType;
  profilePic: string;
  createdCourses: mongoose.Types.ObjectId[];
  enrolledCourses: mongoose.Types.ObjectId[];
  lastCourseVisited: mongoose.Types.ObjectId | null;
  totalRevenue: number;
  refreshTokenString?: string;
}

// interface segreggation to avoid tight coupling
export interface UserContract extends UserDomain, Document {
  createdAt: Date;
  updatedAt: Date;
  isPasswordCorrect(this: UserContract, password: string): Promise<boolean>;
  generateAccessToken(this: UserContract): string;
  generateRefreshToken(this: UserContract, uniqueString: string): string;
}
