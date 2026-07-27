/* ---------------------------------------------------------------------------------------
user.types.ts
------------------------------------------------------------------------------------------ */

import { CourseContract } from "./index.types.ts";

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
  lastCourseVisited: CourseContract | null;
  totalRevenue: number;
  refreshTokenString?: string;
}
