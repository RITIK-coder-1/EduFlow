/* ----------------------------------------------------------------------------------------------
instructorApi.ts
This file does all the instructor API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice.ts";
import {
  transformErrorResponse,
  transformResponse,
} from "../../utils/queryResponses.ts";
import {
  CourseContract,
  CourseSectionContract,
  CourseVideoContract,
} from "../../types/course.types.ts";
import { ApiSuccessResponse } from "../../types/api.types.ts";

const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE A COURSE
    createCourse: builder.mutation({
      query: (courseData: CourseContract) => ({
        url: "/instructor/courses",
        method: "POST",
        body: courseData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course", "Stats", "Category"],
    }),

    // GET A PARTICULAR COURSE
    getCourseInstructor: builder.query({
      query: ({ courseId }: { courseId: string }) => `/instructor/${courseId}`,
      transformErrorResponse,
      transformResponse,
      providesTags: ["Course"],
    }),

    // UPDATE A COURSE
    updateCourse: builder.mutation({
      query: ({
        courseDetails,
        courseId,
      }: {
        courseDetails: CourseContract;
        courseId: string;
      }) => ({
        url: `/instructor/${courseId}`,
        method: "PATCH",
        body: courseDetails,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course", "Category"],
    }),

    // DELETE A COURSE
    deleteCourseInstructor: builder.mutation({
      query: ({ courseId }: { courseId: string }) => ({
        url: `/instructor/${courseId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course", "Stats", "Category"],
    }),

    // ADD A SECTION
    addNewSection: builder.mutation({
      query: ({
        sectionData,
        courseId,
      }: {
        sectionData: CourseSectionContract;
        courseId: string;
      }) => ({
        url: `/instructor/${courseId}/sections`,
        method: "POST",
        body: sectionData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // UPDATE A SECTION
    updateSection: builder.mutation({
      query: ({
        updatedData,
        courseId,
        sectionId,
      }: {
        updatedData: CourseSectionContract;
        courseId: string;
        sectionId: string;
      }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}`,
        method: "PATCH",
        body: updatedData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // DELETE A SECTION
    deleteSection: builder.mutation({
      query: ({
        courseId,
        sectionId,
      }: {
        courseId: string;
        sectionId: string;
      }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // ADD A NEW VIDEO
    addNewVideo: builder.mutation({
      query: ({
        videoData,
        courseId,
        sectionId,
      }: {
        videoData: CourseVideoContract;
        courseId: string;
        sectionId: string;
      }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos`,
        method: "POST",
        body: videoData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // UPDATE A VIDEO
    updateVideo: builder.mutation({
      query: ({
        updatedData,
        courseId,
        sectionId,
        videoId,
      }: {
        updatedData: CourseVideoContract;
        courseId: string;
        sectionId: string;
        videoId: string;
      }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos/${videoId}`,
        method: "PATCH",
        body: updatedData,
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // DELETE A VIDEO
    deleteVideo: builder.mutation({
      query: ({
        courseId,
        sectionId,
        videoId,
      }: {
        courseId: string;
        sectionId: string;
        videoId: string;
      }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos/${videoId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // PUBLISH A COURSE
    publishCourse: builder.mutation({
      query: ({ status, courseId }: { status: string; courseId: string }) => ({
        url: `instructor/${courseId}/publish`,
        method: "PATCH",
        body: { status },
      }),
      transformErrorResponse,
      transformResponse,
      invalidatesTags: ["Course"],
    }),

    // GET INSTRUCTOR COURSES IMPORTANT INFORMATION (TO BE DONE: REFACTORING IN PROGRESS)
    getInstructorData: builder.query({
      async queryFn(_, _queryApi, _extraOptions, baseQuery) {
        try {
          const result = await baseQuery("/instructor/courses");

          // Check if any request failed
          // const errors = result?.error;
          // if (errors?.length > 0) return { error: errors[0].error };

          // the created courses
          const createdCourses = result?.(data as ApiSuccessResponse<CourseContract[]>)?.data;
          // the number of students enrolled of each course
          const numberOfStudents = createdCourses?.map(
            (course) => course?.enrolledBy?.length
          );
          // the total number of students
          const totalStudents = numberOfStudents?.reduce(
            (acc, val) => acc + val,
            0
          );

          return {
            data: { totalStudents, createdCourses },
          };
        } catch (error: unknown) {
          return { error };
        }
      },
      providesTags: ["Course", "User"],
    }),
  }),
});

export const {
  useGetCourseInstructorQuery,
  useUpdateCourseMutation,
  useUpdateSectionMutation,
  useUpdateVideoMutation,
  useAddNewSectionMutation,
  useAddNewVideoMutation,
  useDeleteCourseInstructorMutation,
  useDeleteSectionMutation,
  useDeleteVideoMutation,
  useCreateCourseMutation,
  usePublishCourseMutation,
  useGetInstructorDataQuery,
} = instructorApi;
