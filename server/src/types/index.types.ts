/* ---------------------------------------------------------------------------------------
User.model.ts
Centralized exporting file for all the types 
------------------------------------------------------------------------------------------ */

import type { UserContract } from "./user.types.ts";
import type {
  CourseContract,
  CourseCategoryContract,
  CourseProgressContract,
  CourseSectionContract,
  CourseVideoContract,
} from "./course.types.ts";
import type { TokenPayload } from "./api.types.ts";

export type {
  UserContract,
  CourseContract,
  CourseCategoryContract,
  CourseProgressContract,
  CourseSectionContract,
  CourseVideoContract,
  TokenPayload,
};
