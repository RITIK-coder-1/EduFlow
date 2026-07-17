/* ---------------------------------------------------------------------------------------
User.model.ts
Centralized exporting file for all the types 
------------------------------------------------------------------------------------------ */

import { UserContract } from "./user.types.ts";
import {
  CourseContract,
  CourseCategoryContract,
  CourseProgressContract,
  CourseSectionContract,
  CourseVideoContract,
} from "./course.types.ts";
import { TokenPayload } from "./api.types.ts";

export {
  UserContract,
  CourseContract,
  CourseCategoryContract,
  CourseProgressContract,
  CourseSectionContract,
  CourseVideoContract,
  TokenPayload,
};
