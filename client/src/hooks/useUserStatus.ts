/* ----------------------------------------------------------------------------------------------
useUserStatus.ts
The hook to provide the current status of the user 
------------------------------------------------------------------------------------------------- */

import { useGetUserQuery, useGetCourseQuery } from "../api/index.api";
import type {
  CourseContract,
  UserRoles,
  UserContract,
} from "../types/index.types";
import { useAppSelector } from "./useReduxHooks";

interface UserStatus {
  isAuthenticated: boolean;
  isOwner: boolean;
  isEnrolled: boolean;
  accountType: UserRoles | undefined;
}

function useUserStatus(courseId: string | void): UserStatus {
  // the user
  let user: UserContract | undefined = undefined;

  // the course
  let course: CourseContract | null | undefined = null;
  if (courseId) {
    // only if the courseID is provided
    const { data: courseData } = useGetCourseQuery({ courseId });
    course = courseData?.data;
    const { data: userData } = useGetUserQuery(); // call the API only if the course information is asked to prevent unwanted calls 
    user = userData?.data; // I have not saved all the user data in the redux state, so I'm calling the API
  }

  /* ----------------------------------------------------------------------------------------------
  The user stats
  ------------------------------------------------------------------------------------------------- */

  // the authentication status of the user
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated); // for immediate access

  // the type of user
  const accountType =
    useAppSelector((state) => state.auth.user?.accountType); // for immediate access

  // check if the user is the owner of the course
  const isOwner = user?._id === course?.owner?._id ? true : false;

  // check if the user is enrolled in the course or not
  const isEnrolled = user?.enrolledCourses?.some(
    (course: CourseContract) => course?._id === courseId
  );

  return {
    isAuthenticated,
    isOwner: isOwner || false,
    isEnrolled: isEnrolled || false,
    accountType,
  };
}

export default useUserStatus;
