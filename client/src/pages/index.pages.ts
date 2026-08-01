/* ----------------------------------------------------------------------------------------------
index.pages.ts
Centralized exporting file for all the pages
------------------------------------------------------------------------------------------------- */

import Register from "./auth/register/Register";
import Login from "./auth/login/Login";
import Profile from "./account/Profile";
import UpdateProfile from "./account/UpdateProfile";
import UpdatePassword from "./account/UpdatePassword";
import UpdateEmail from "./account/UpdateEmail";
import CreateCourse from "./course/CreateCourse";
import UpdateCourse from "./course/UpdateCourse";
import Home from "./common/Home";
import Dashboard from "./dashboard/Dashboard";
import EnrolledCourses from "./common/EnrolledCourses";
import CreatedCourses from "./course/CreatedCourses";
import InstructorCourse from "./course/InstructorCourse";
import PublicCourse from "./course/PublicCourse";
import VideoPlayer from "./course/VideoPlayer";
import NotFound from "./common/NotFound";

export {
  Register,
  Login,
  Profile,
  UpdateProfile,
  UpdatePassword,
  UpdateEmail,
  CreateCourse,
  UpdateCourse,
  Home,
  Dashboard,
  EnrolledCourses,
  CreatedCourses,
  InstructorCourse,
  PublicCourse,
  VideoPlayer,
  NotFound,
};
