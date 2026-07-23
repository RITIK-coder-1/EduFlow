/* ---------------------------------------------------------------------------------------
course.controllers.ts
All the controllers for courses that are public 
------------------------------------------------------------------------------------------ */

import { ApiError, ApiResponse, asyncHandler } from "../utils/index.utils.ts";
import {
  Course,
  User,
  CourseCategory,
  CourseProgress,
} from "../models/index.model.ts";
import type { Response, Request } from "express";
import type {
  CourseSectionContract,
  CourseVideoContract,
  UserContract,
} from "../types/index.types.ts";

/* ---------------------------------------------------------------------------------------
GET ALL COURSES CONTROLLER
------------------------------------------------------------------------------------------ */

const getAllCoursesFunction = async (_req: Request, res: Response) => {
  // only show the courses that are published by the instructors
  const courses = await Course.find({ status: "Published" })
    .select("-enrolledBy -status -__v")
    .populate<{
      owner: Pick<UserContract, "firstName" | "lastName" | "username">;
    }>({
      path: "owner",
      select: "firstName lastName username",
    });

  if (!courses) {
    console.error("GET ALL COURSES ERROR: courses not fetched");
    throw new ApiError(
      500,
      "The courses couldn't be fetched. Please try again!"
    );
  }

  console.log("Courses fetched for everyone!");

  return res
    .status(200)
    .json(new ApiResponse(200, "All the courses are fetched!", courses));
};

/* ---------------------------------------------------------------------------------------
GET COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

interface MinimalCourse {
  courseId?: string;
}

const getCourseFunction = async (
  req: Request<MinimalCourse>,
  res: Response
) => {
  const { courseId } = req.params;

  if (!courseId) {
    console.error("GET COURSE ERROR: invalid id");
    throw new ApiError(400, "Invalid Course ID!");
  }

  // Getting the course along with the nested sub-documents
  const course = await Course.findById(courseId)
    .select("-enrolledBy -status -__v -revenue")
    .populate<{
      sections: CourseSectionContract & {
        courseVideos: CourseVideoContract;
      };
    }>({
      path: "sections",
      populate: {
        path: "courseVideos",
      },
    })
    .populate({
      path: "owner",
      select: "-password -refreshTokenString -__v -enrolledCourses",
    })
    .exec();

  if (!course) {
    console.error("GET COURSE ERROR: invalid course");
    throw new ApiError(404, "The course doesn't exist!");
  }

  console.log("Course successfully fetched!");

  return res
    .status(200)
    .json(
      new ApiResponse(200, "The course has been successfully fetched!", course)
    );
};

/* ---------------------------------------------------------------------------------------
ENROLL IN A COURSE CONTROLLER
------------------------------------------------------------------------------------------ */

const enrollCourseFunction = async (
  req: Request<MinimalCourse>,
  res: Response
) => {
  const userId = req.user?._id;
  const { courseId } = req.params;

  // validate the IDs
  if (!userId || !courseId) {
    console.error("ENROLL COURSE ERROR: invalid id");
    throw new ApiError(400, "Invalid User or Course ID!");
  }

  const user = await User.findById(userId);

  // validate the user
  if (!user) {
    console.error("ENROLL COURSE ERROR: no user");
    throw new ApiError(404, "The user doesn't exist!");
  }

  const course = await Course.findById(courseId);

  // validate the course
  if (!course) {
    console.error("ENROLL COURSE ERROR: no course");
    throw new ApiError(404, "The course doesn't exist!");
  }

  // the course owner
  const courseOwner = await User.findById(course?.owner);

  // see if the student has already enrolled
  if (course?.enrolledBy?.includes(user?._id)) {
    console.error("ENROLL COURSE ERROR: student already enrolled.");
    throw new ApiError(400, "The student has already enrolled!");
  }

  // simultaneous async operations
  await Promise.all([
    // add the course to the enrolled courses list and last-visited course of the user
    User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { enrolledCourses: courseId },
        $set: { lastCourseVisited: courseId },
      },
      { new: true }
    ),
    // add the user to the enrolledBy list of the course
    Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { enrolledBy: userId } },
      { new: true }
    ),
    // create a progress document to track the user's progress of the course
    CourseProgress.create({
      course: courseId,
      user: userId,
      completedVideos: [],
    }),
  ]).catch(() => {
    console.error("ENROLL COURSE ERROR: enrollment failed");
    throw new ApiError(500, "Enrollment failed. Please try again!");
  });

  console.log(`${user.firstName} enrolled the course: ${course.title}`);

  // once the enrollment is successfull, update the revenue of the course and the instructor (only if the course is not free)
  if (course?.price) {
    // update the course revenue
    const currentCourseRevenue = course?.revenue;
    const currentCoursePrice = course?.price;
    const newCourseRevenue = currentCourseRevenue + currentCoursePrice;
    course.revenue = newCourseRevenue;
    await course.save();

    // update the instructor revenue
    if (courseOwner?.totalRevenue) {
      courseOwner.totalRevenue += currentCoursePrice;
    }
    await courseOwner?.save();

    console.log("revenue updated");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "The student has successfully enrolled in the course",
        {}
      )
    );
};

/* ---------------------------------------------------------------------------------------
SHOW ALL CATEGORIES CONTROLLER
------------------------------------------------------------------------------------------ */

const showAllCategoriesFunction = async (req: Request, res: Response) => {
  try {
    const categories = await CourseCategory.find({})
      .select("-__v")
      .populate("courses");

    console.log("Categories fetched!");

    return res
      .status(200)
      .json(
        new ApiResponse(200, "All Categories fetched successfully", categories)
      );
  } catch (error) {
    // in case of error, I want to send the message to the frontend. I'm handling it irrespective of asyncHandler
    console.error("SHOW CATEGORIES ERROR:", error);
    throw new ApiError(500, "Could not fetch categories. Please try again!");
  }
};

/* ---------------------------------------------------------------------------------------
ERROR HANDLING
------------------------------------------------------------------------------------------ */

const getCourse = asyncHandler(getCourseFunction);
const getAllCourses = asyncHandler(getAllCoursesFunction);
const enrollCourse = asyncHandler(enrollCourseFunction);
const showAllCategories = asyncHandler(showAllCategoriesFunction);

export { getCourse, getAllCourses, enrollCourse, showAllCategories };
