/* ---------------------------------------------------------------------------------------
user.types.ts
------------------------------------------------------------------------------------------ */

import { CourseContract } from "./index.types";

type AccountType = "Student" | "Instructor" | "Admin";

export interface UserContract {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  dateOfBirth: string;
  accountType: AccountType;
  profilePic: string;
  createdCourses: CourseContract[];
  enrolledCourses: CourseContract[];
  lastCourseVisited: CourseContract | null | string;
  totalRevenue: number;
  refreshTokenString?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type ReduxUserStateContract = Pick<UserContract, "_id" | "accountType">;

export type UserRoles = "Student" | "Instructor" | "Admin";

