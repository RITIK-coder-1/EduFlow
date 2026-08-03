/* ----------------------------------------------------------------------------------------------
instructorApi.ts
This file does all the instructor API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice";
import {
  transformErrorResponse,
  transformResponse,
} from "../../utils/queryResponses";
import {
  CourseContract,
  CourseSectionContract,
  CourseVideoContract,
  ResponseContract,
  ApiSuccessResponse,
} from "../../types/index.types";

interface MinimalCourse {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  sections?: CourseSectionContract[];
  tags?: string[];
  courseId?: string;
  status?: string;
}

interface MinimalCourseVideoContract {
  title: string;
  sectionId?: string;
  videoId?: string;
  courseId?: string;
}

interface MinimalSectionContract {
  title?: string;
  courseId?: string;
  sectionId?: string;
}

const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE A COURSE
    createCourse: builder.mutation<
      ResponseContract<CourseContract>,
      MinimalCourse
    >({
      query: (courseData) => ({
        url: "/instructor/courses",
        method: "POST",
        body: courseData,
      }),
      transformErrorResponse,
      transformResponse: transformResponse<CourseContract>(),
      invalidatesTags: ["Course", "Stats", "Category"],
    }),

    // GET A PARTICULAR COURSE
    getCourseInstructor: builder.query<
      ResponseContract<CourseContract>,
      MinimalCourse
    >({
      query: ({ courseId }) => `/instructor/${courseId}`,
      transformErrorResponse,
      transformResponse: transformResponse<CourseContract>(),
      providesTags: ["Course"],
    }),

    // UPDATE A COURSE
    updateCourse: builder.mutation<
      ResponseContract<CourseContract>,
      MinimalCourse
    >({
      query: ({ courseId, ...courseDetails }) => ({
        url: `/instructor/${courseId}`,
        method: "PATCH",
        body: courseDetails,
      }),
      transformErrorResponse,
      transformResponse: transformResponse<CourseContract>(),
      invalidatesTags: ["Course", "Category"],
    }),

    // DELETE A COURSE
    deleteCourseInstructor: builder.mutation<
      ResponseContract<null>,
      MinimalCourse
    >({
      query: ({ courseId }) => ({
        url: `/instructor/${courseId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse: transformResponse<null>(),
      invalidatesTags: ["Course", "Stats", "Category"],
    }),

    // ADD A SECTION
    addNewSection: builder.mutation<
      ResponseContract<CourseContract>,
      MinimalSectionContract
    >({
      query: ({ title, courseId }) => ({
        url: `/instructor/${courseId}/sections`,
        method: "POST",
        body: { title },
      }),
      transformErrorResponse,
      transformResponse: transformResponse<CourseContract>(),
      invalidatesTags: ["Course"],
    }),

    // UPDATE A SECTION
    updateSection: builder.mutation<
      ResponseContract<CourseSectionContract>,
      MinimalSectionContract
    >({
      query: ({ title, courseId, sectionId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}`,
        method: "PATCH",
        body: { title },
      }),
      transformErrorResponse,
      transformResponse: transformResponse<CourseSectionContract>(),
      invalidatesTags: ["Course"],
    }),

    // DELETE A SECTION
    deleteSection: builder.mutation<
      ResponseContract<null>,
      MinimalSectionContract
    >({
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
      transformResponse: transformResponse<null>(),
      invalidatesTags: ["Course"],
    }),

    // ADD A NEW VIDEO
    addNewVideo: builder.mutation<
      ResponseContract<CourseVideoContract>,
      MinimalCourseVideoContract
    >({
      query: ({ title, courseId, sectionId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos`,
        method: "POST",
        body: { title, sectionId },
      }),
      transformErrorResponse,
      transformResponse: transformResponse<CourseVideoContract>(),
      invalidatesTags: ["Course"],
    }),

    // UPDATE A VIDEO
    updateVideo: builder.mutation<
      ResponseContract<CourseVideoContract>,
      MinimalCourseVideoContract
    >({
      query: ({ title, courseId, sectionId, videoId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos/${videoId}`,
        method: "PATCH",
        body: { title, videoId, sectionId },
      }),
      transformErrorResponse,
      transformResponse: transformResponse<CourseVideoContract>(),
      invalidatesTags: ["Course"],
    }),

    // DELETE A VIDEO
    deleteVideo: builder.mutation<
      ResponseContract<null>,
      MinimalCourseVideoContract
    >({
      query: ({ courseId, sectionId, videoId }) => ({
        url: `/instructor/${courseId}/sections/${sectionId}/videos/${videoId}`,
        method: "DELETE",
      }),
      transformErrorResponse,
      transformResponse: transformResponse<null>(),
      invalidatesTags: ["Course"],
    }),

    // PUBLISH A COURSE
    publishCourse: builder.mutation<
      ResponseContract<CourseContract>,
      MinimalCourse
    >({
      query: ({ status, courseId }) => ({
        url: `instructor/${courseId}/publish`,
        method: "PATCH",
        body: { status },
      }),
      transformErrorResponse,
      transformResponse: transformResponse<CourseContract>(),
      invalidatesTags: ["Course"],
    }),

    // GET INSTRUCTOR COURSES IMPORTANT INFORMATION (TO BE DONE: REFACTORING IN PROGRESS)
    getInstructorData: builder.query<
      ResponseContract<{
        totalStudents: number;
        createdCourses: CourseContract[];
      }>,
      string
    >({
      async queryFn(_, _queryApi, _extraOptions, baseQuery) {
        try {
          const { data, error } = await baseQuery("/instructor/courses");

          // Check if any request failed
          if (error) {
            return { error };
          }

          // the created courses
          const createdCourseApi = data as ApiSuccessResponse<CourseContract[]>;
          const createdCourses: CourseContract[] = createdCourseApi?.data ?? [];

          // the number of students enrolled of each course
          const numberOfStudents = createdCourses?.map(
            (course) => course?.enrolledBy?.length
          );

          // the total number of students
          const totalStudents = numberOfStudents?.reduce(
            (acc: number, val: number) => acc + val,
            0
          );

          return {
            data: {
              data: { totalStudents, createdCourses },
              message: "Instructor course information fetched!",
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || "CUSTOM_ERROR",
              data: {
                message:
                  error?.message ||
                  "An error occurred fetching dashboard analytics",
                success: false,
              },
            },
          };
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
