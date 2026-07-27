/* ----------------------------------------------------------------------------------------------
courseApi.ts
This file does all the course related PUBLIC API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice.ts";

interface MinimalCourse {
  courseId: string;
}

const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL THE COURSES
    getAllTheCourses: builder.query({
      query: () => "/courses",
      providesTags: ["Course"],
    }),

    // GET A PARTICULAR COURSE
    getCourse: builder.query({
      query: ({ courseId }: MinimalCourse) => `/courses/${courseId}`,
      providesTags: ["Course"],
    }),

    // ENROLL INTO A COURSE
    enrollCourse: builder.mutation({
      query: ({ courseId }: MinimalCourse) => ({
        url: `/courses/${courseId}`,
        method: "POST",
      }),
      invalidatesTags: ["Course", "User"],
    }),

    // SHOW ALL CATEGORIES
    getAllCategories: builder.query({
      query: () => "/courses/categories",
      providesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllTheCoursesQuery,
  useGetCourseQuery,
  useEnrollCourseMutation,
  useGetAllCategoriesQuery,
} = courseApi;
