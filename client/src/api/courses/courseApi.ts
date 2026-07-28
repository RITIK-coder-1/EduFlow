/* ----------------------------------------------------------------------------------------------
courseApi.ts
This file does all the course related PUBLIC API calls 
------------------------------------------------------------------------------------------------- */

import {
  ResponseContract,
  CourseContract,
  CourseCategoryContract,
} from "../../types/index.types.ts";
import apiSlice from "../base/apiSlice.ts";
import {
  transformResponse,
  transformErrorResponse,
} from "../../utils/queryResponses.ts";

interface MinimalCourse {
  courseId: string;
}

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL THE COURSES
    getAllTheCourses: builder.query<ResponseContract<CourseContract[]>, void>({
      query: () => "/courses",
      providesTags: ["Course"],
      transformResponse: transformResponse<CourseContract[]>(),
      transformErrorResponse,
    }),

    // GET A PARTICULAR COURSE
    getCourse: builder.query<ResponseContract<CourseContract>, MinimalCourse>({
      query: ({ courseId }) => `/courses/${courseId}`,
      providesTags: ["Course"],
      transformResponse: transformResponse<CourseContract>(),
      transformErrorResponse,
    }),

    // ENROLL INTO A COURSE
    enrollCourse: builder.mutation<ResponseContract<null>, MinimalCourse>({
      query: ({ courseId }) => ({
        url: `/courses/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["Course", "User"],
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
    }),

    // SHOW ALL CATEGORIES
    getAllCategories: builder.query<
      ResponseContract<CourseCategoryContract[]>,
      void
    >({
      query: () => "/courses/categories",
      providesTags: ["Category"],
      transformResponse: transformResponse<CourseCategoryContract[]>(),
      transformErrorResponse,
    }),
  }),
});

export const {
  useGetAllTheCoursesQuery,
  useGetCourseQuery,
  useEnrollCourseMutation,
  useGetAllCategoriesQuery,
} = courseApi;
