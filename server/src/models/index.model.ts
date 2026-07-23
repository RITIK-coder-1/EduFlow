/* ---------------------------------------------------------------------------------------
index.model.ts
This is a centralized exporting file for every single model
------------------------------------------------------------------------------------------ */

// Course models
import Course from "./course/Course.model.ts";
import CourseSection from "./course/CourseSection.model.ts";
import CourseVideo from "./course/CourseVideo.model.ts";
import CourseCategory from "./course/CourseCategory.model.ts";

// User models
import User from "./user/User.model.ts";
import CourseProgress from "./user/CourseProgress.model.ts";

// Auth Model
import OTP from "./auth/OTP.model.ts";

export {
  Course,
  CourseSection,
  CourseVideo,
  User,
  CourseProgress,
  CourseCategory,
  OTP,
};
