/* ----------------------------------------------------------------------------------------------
adminApi.ts
This file does all the admin API calls 
------------------------------------------------------------------------------------------------- */

import type {
  CourseCategoryContract,
  CourseContract,
  ResponseContract,
  UserContract,
} from "../../types/index.types";
import apiSlice from "../base/apiSlice";
import {
  transformResponse,
  transformErrorResponse,
} from "../../utils/queryResponses";

interface SystemStats {
  userCount: number;
  studentCount: number;
  instructorCount: number;
  courseCount: number;
  categoryCount: number;
  totalRevenue: number;
}

const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE CATEGORY
    createCategory: builder.mutation<
      ResponseContract<CourseCategoryContract>,
      Pick<CourseCategoryContract, "name">
    >({
      query: (categoryData) => ({
        url: "/admin/categories",
        method: "POST",
        body: categoryData,
      }),
      invalidatesTags: ["Category", "Stats"],
      transformResponse: transformResponse<CourseCategoryContract>(),
      transformErrorResponse,
    }),

    // UPDATE CATEGORY
    updateCategory: builder.mutation<
      ResponseContract<CourseCategoryContract>,
      {
        categoryData: CourseCategoryContract;
        categoryId: string;
      }
    >({
      query: ({ categoryData, categoryId }) => ({
        url: `/admin/categories/${categoryId}`,
        method: "PATCH",
        body: categoryData,
      }),
      invalidatesTags: ["Category"],
      transformResponse: transformResponse<CourseCategoryContract>(),
      transformErrorResponse,
    }),

    // DELETE CATEGORY
    deleteCategory: builder.mutation<ResponseContract<null>, string>({
      query: (categoryId) => ({
        url: `/admin/categories/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "Stats"],
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
    }),

    // GET ALL USERS
    getAllUsers: builder.query<ResponseContract<UserContract[]>, void>({
      query: () => "/admin/users",
      providesTags: ["User"],
      transformResponse: transformResponse<UserContract[]>(),
      transformErrorResponse,
    }),

    // GET SPECIFIC USER
    getUserAdmin: builder.query<ResponseContract<UserContract>, string>({
      query: (userId) => `/admin/users/${userId}`,
      providesTags: ["User"],
      transformResponse: transformResponse<UserContract>(),
      transformErrorResponse,
    }),

    // DELETE USER
    deleteUserAdmin: builder.mutation<ResponseContract<null>, string>({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User", "Stats", "Category"],
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
    }),

    // GET ALL COURSES
    getAllCoursesAdmin: builder.query<ResponseContract<CourseContract[]>, void>(
      {
        query: () => "/admin/courses",
        providesTags: ["Course"],
        transformResponse: transformResponse<CourseContract[]>(),
        transformErrorResponse,
      }
    ),

    // GET SPECIFIC COURSE
    getCourseAdmin: builder.query<ResponseContract<CourseContract>, string>({
      query: (courseId) => `/admin/courses/${courseId}`,
      providesTags: ["Course"],
      transformResponse: transformResponse<CourseContract>(),
      transformErrorResponse,
    }),

    // DELETE COURSE
    deleteCourseAdmin: builder.mutation<ResponseContract<null>, string>({
      query: (courseId) => ({
        url: `/admin/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course", "Stats", "Category"],
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
    }),

    // SYSTEM STATS
    getSystemStats: builder.query<ResponseContract<SystemStats>, void>({
      query: () => "/admin/stats",
      providesTags: ["Stats"],
      transformResponse: transformResponse<SystemStats>(),
      transformErrorResponse,
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllUsersQuery,
  useGetUserAdminQuery,
  useDeleteUserAdminMutation,
  useGetAllCoursesAdminQuery,
  useGetCourseAdminQuery,
  useDeleteCourseAdminMutation,
  useGetSystemStatsQuery,
} = adminApi;
