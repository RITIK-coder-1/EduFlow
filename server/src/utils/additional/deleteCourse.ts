/* ---------------------------------------------------------------------------------------
deleteCourse.ts
This utility function is used to delete a course that involes multi-step procedures
------------------------------------------------------------------------------------------ */

import {
  Course,
  CourseSection,
  CourseVideo,
  CourseCategory,
  User,
  CourseProgress,
  CourseSectionContract,
  CourseVideoContract,
  UserContract,
} from "../../models/index.model.ts";
import { deleteFromCloudinary } from "../index.utils.ts";
import ApiError from "../api/apiError.js";
import { DeleteResult, UpdateResult } from "mongoose";

const deleteCourse = async (courseId: string): Promise<void> => {
  // Getting the course
  const course = await Course.findById(courseId)
    .populate<{
      sections: (CourseSectionContract & {
        courseVideos: CourseVideoContract[];
      })[];
    }>({
      path: "sections",
      populate: {
        path: "courseVideos",
      },
    })
    .exec();

  if (!course) {
    console.error("COURSE DELETE ERROR: course not found!");
  }

  // Deleting all the sections
  const sectionDelete: Promise<DeleteResult> = CourseSection.deleteMany({
    course: courseId,
  });

  // Deleting all the videos
  const videosDelete: Promise<DeleteResult>[] =
    course?.sections?.map((section) =>
      CourseVideo.deleteMany({ courseSection: section._id })
    ) || [];

  // Removing the course from the users' enrolled courses list
  const userCourseDelete: Promise<UpdateResult> = User.updateMany(
    { enrolledCourses: courseId },
    { $pull: { enrolledCourses: courseId } }
  );

  // Removing the course from the last course visited list of the users
  const removeLastVisited: Promise<UpdateResult> = User.updateMany(
    { lastCourseVisited: courseId },
    { $set: { lastCourseVisited: null } }
  );

  // Removing the course from the category lists
  const categoryCourseDelete: Promise<UpdateResult> = CourseCategory.updateOne(
    { name: course?.category },
    {
      $pull: { courses: courseId },
    }
  );

  // Removing the course from the instructor's list
  const instructorCourseDelete: Promise<UserContract | null> =
    User.findByIdAndUpdate(course?.owner, {
      $pull: { createdCourses: courseId },
    });

  // deleting the course progress document of all the users
  const courseProgressDelete: Promise<DeleteResult> = CourseProgress.deleteMany(
    { course: courseId }
  );

  const dbCleanUp: Promise<any> = Promise.all([
    sectionDelete,
    userCourseDelete,
    removeLastVisited,
    categoryCourseDelete,
    instructorCourseDelete,
    courseProgressDelete,
    ...videosDelete,
  ]);

  // CLOUDINARY DELETES

  // Deleting the thumbnail from cloudinary
  const thumbnailDelete = deleteFromCloudinary(course?.thumbnail);

  // Deleting the videos from cloudinary

  type MinimalVideo = Pick<CourseVideoContract, "videoUrl">; // Creating a new type using ONLY the 'videoUrl' field from CourseVideoContract

  type MinimalSection = Pick<CourseSectionContract, "courseVideos"> & {
    courseVideos: MinimalVideo[];
  }; // Creating a new type using ONLY the 'courseVideos' field from CourseSectionContract

  // course object has sections array. Sections array has documents. Each sectionDocument has courseVideos array. The array has video documents
  const videosDeleteCloudinary = (
    (course?.sections as unknown as MinimalSection[]) || []
  ).flatMap((section) =>
    section.courseVideos.map((video) =>
      deleteFromCloudinary(video.videoUrl, "video")
    )
  );

  const cloudinaryCleanUp = Promise.all([
    thumbnailDelete,
    ...videosDeleteCloudinary,
  ]);

  try {
    await dbCleanUp.catch((err) => {
      console.error("COURSE DELETE ERROR: Children", err);

      throw new ApiError(
        500,
        "There was a problem while deleting the course. Please try again!"
      );
    });

    // Delete the Parent last
    await Course.findByIdAndDelete(courseId).catch((error) => {
      console.error("COURSE DELETE ERROR: Parent", error);

      throw new ApiError(
        500,
        "There was a problem while deleting the course. Please try again!"
      );
    });

    // Fire off Cloudinary deletes (we await them just to be clean)
    await cloudinaryCleanUp.catch((error) => {
      console.error("COURSE DELETE ERROR: cloudinary", error);
    });
  } catch (error: unknown) {
    error instanceof Error
      ? console.error("DELETE COURSE ERROR:", error.message)
      : console.error("DELETE COURSE ERROR:", error);
    throw new ApiError(500, "Failed to delete the course");
  }
};

export default deleteCourse;
