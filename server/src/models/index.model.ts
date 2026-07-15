/* ---------------------------------------------------------------------------------------
index.model.js
This is a centralized exporting file for every single model
------------------------------------------------------------------------------------------ */

// Course models
import Course, { CourseContract } from "./course/Course.model.ts";
import CourseSection, {
  CourseSectionContract,
} from "./course/CourseSection.model.js";
import CourseVideo, {
  CourseVideoContract,
} from "./course/CourseVideo.model.ts";
import CourseCategory, {
  CourseCategoryContract,
} from "./course/CourseCategory.model.ts";

// User models
import User, { UserContract } from "./user/User.model.ts";
import CourseProgress, {
  CourseProgressContract,
} from "./user/CourseProgress.model.js";

// Auth Model
import OTP from "./auth/OTP.model.js";

export {
  Course,
  CourseSection,
  CourseVideo,
  User,
  CourseProgress,
  CourseCategory,
  OTP,
  CourseContract,
  CourseSectionContract,
  CourseVideoContract,
  CourseCategoryContract,
  UserContract,
  CourseProgressContract,
};
