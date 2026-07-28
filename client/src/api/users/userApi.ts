/* ----------------------------------------------------------------------------------------------
userApi.ts
This file does all the user API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice.ts";
import {
  transformResponse,
  transformErrorResponse,
} from "../../utils/queryResponses.ts";
import {
  CourseContract,
  ResponseContract,
  UserContract,
  CourseVideoContract,
  ApiSuccessResponse,
} from "../../types/index.types.ts";

type MinimalUser = Pick<UserContract, "firstName" | "lastName" | "username">;

interface UpdateEmailContract {
  newEmail: string;
  password?: string;
  userOtp?: string;
}

type ProgressPayload = {
  completedVideos: CourseVideoContract[];
  progress: number;
  totalLearningCredits: number;
};

// the API calls
const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // GET THE USER PROFILE
    getUser: builder.query<ResponseContract<UserContract>, void>({
      query: () => "/users/profile",
      transformResponse: transformResponse<UserContract>(),
      transformErrorResponse,
      providesTags: ["User", "Course"],
    }),

    // UPDATE USER DETAILS
    updateUserDetails: builder.mutation<
      ResponseContract<UserContract>,
      MinimalUser
    >({
      query: (updatedData) => ({
        url: "/users/profile",
        method: "PATCH",
        body: updatedData,
      }),
      transformResponse: transformResponse<UserContract>(),
      transformErrorResponse,
      invalidatesTags: ["User"],
    }),

    // DELETE USER ACCOUNT
    deleteUserAccount: builder.mutation<ResponseContract<null>, void>({
      query: () => ({
        url: "/users/profile",
        method: "DELETE",
      }),
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
      invalidatesTags: ["User", "Stats"],
    }),

    // CREATE OTP TO UPDATE USER EMAIL
    updateUserEmailOtp: builder.mutation<
      ResponseContract<UpdateEmailContract>,
      UpdateEmailContract
    >({
      query: (updatedData) => ({
        url: "/users/profile/email",
        method: "POST",
        body: updatedData,
      }),
      transformResponse: transformResponse<UpdateEmailContract>(),
      transformErrorResponse,
    }),
    // VALIDATE OTP AND UPDATE USER EMAIL
    updateUserEmail: builder.mutation<
      ResponseContract<UserContract>,
      UpdateEmailContract
    >({
      query: (updatedData) => ({
        url: "/users/profile/email",
        method: "PATCH",
        body: updatedData,
      }),
      transformResponse: transformResponse<UserContract>(),
      transformErrorResponse,
      invalidatesTags: ["User"],
    }),

    // DELETE USER PROFILE PIC
    deleteUserProfilePic: builder.mutation<
      ResponseContract<UserContract>,
      void
    >({
      query: () => ({
        url: "/users/profile/pic",
        method: "DELETE",
      }),
      transformResponse: transformResponse<UserContract>(),
      transformErrorResponse,
      invalidatesTags: ["User"],
    }),

    // UPDATE USER PASSWORD
    updateUserPassword: builder.mutation<
      ResponseContract<null>,
      { oldPassword: string; newPassword: string }
    >({
      query: (updatedData) => ({
        url: "/users/password",
        method: "PATCH",
        body: updatedData,
      }),
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
    }),

    // GET ENROLLED COURSES
    getEnrolledCourses: builder.query<ResponseContract<CourseContract[]>, void>(
      {
        query: () => "/users/enrolled-courses",
        providesTags: ["Course"],
        transformResponse: transformResponse<CourseContract[]>(),
        transformErrorResponse,
      }
    ),

    // LAST COURSE VISITED
    lastCourseVisited: builder.mutation<
      ResponseContract<null>,
      { courseId: string }
    >({
      query: ({ courseId }) => ({
        url: "/users/enrolled-courses/last-visited",
        method: "PATCH",
        body: { courseId },
      }),
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
      invalidatesTags: ["User", "Course"],
    }),

    // GET COURSE PROGRESS
    getCourseProgress: builder.query<
      ResponseContract<{
        completedVideos: CourseVideoContract[];
        progress: number;
        totalLearningCredits: number;
      }>,
      { courseId: string }
    >({
      query: ({ courseId }) => `/users/enrolled-courses/${courseId}/progress`,
      providesTags: (result, error, { courseId }) => [
        { type: "Course", id: courseId },
      ],
      transformResponse: transformResponse<{
        completedVideos: CourseVideoContract[];
        progress: number;
        totalLearningCredits: number;
      }>(),
      transformErrorResponse,
    }),

    // GET AVERAGE PROGRESS ACROSS ALL THE COURSES
    getBulkCourseProgress: builder.query<
      ResponseContract<{
        average: number;
        totalLearningCredits: number;
        details: number[];
      }>,
      string[]
    >({
      // I'm passing the entire array of enrolledCourses here
      async queryFn(courseIds, _queryApi, _extraOptions, baseQuery) {
        try {
          // Execute all requests in parallel
          const results = await Promise.all(
            courseIds?.map((id: string) =>
              baseQuery(`/users/enrolled-courses/${id}/progress`)
            )
          );

          // Check if any request failed
          const firstErrorResult = results.find((res) => res.error);
          if (firstErrorResult && firstErrorResult.error) {
            return { error: firstErrorResult.error };
          }

          // Calculating the average progress across all the courses
          const progressValues = results?.map((res) => {
            const apiData = res?.data as ApiSuccessResponse<ProgressPayload>;

            return apiData?.data?.progress;
          });
          const total = progressValues?.reduce(
            (acc, val) => (acc as number) + (val as number),
            0
          );
          const average =
            progressValues?.length > 0
              ? (total as number) / progressValues?.length
              : 0;

          // Calculating the total credits across all the courses
          const creditValues = results?.map((res) => {
            const apiData = res?.data as ApiSuccessResponse<ProgressPayload>;

            return apiData?.data?.totalLearningCredits;
          });
          const totalLearningCredits = creditValues?.reduce(
            (acc, val) => (acc as number) + (val as number),
            0
          );

          return {
            data: {
              data: {
                average: Math.ceil(average),
                totalLearningCredits,
                details: progressValues,
              },
              message: "Course progress successfully fetched!",
            },
          };
        } catch (error: any) {
          return {
            error: {
              status: error?.status || "CUSTOM_ERROR",
              data: {
                message: error?.message || "An unknown error occurred",
                success: false,
              },
            },
          };
        }
      },
      providesTags: ["Course"],
    }),

    // COMPLETE A VIDEO
    completeCourseVideo: builder.mutation<
      ResponseContract<null>,
      { courseId: string; videoId: string }
    >({
      query: ({ courseId, videoId }) => ({
        url: `/users/enrolled-courses/${courseId}/videos/${videoId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Course"],
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserDetailsMutation,
  useDeleteUserAccountMutation,
  useDeleteUserProfilePicMutation,
  useUpdateUserEmailMutation,
  useUpdateUserEmailOtpMutation,
  useUpdateUserPasswordMutation,
  useLastCourseVisitedMutation,
  useGetEnrolledCoursesQuery,
  useGetCourseProgressQuery,
  useCompleteCourseVideoMutation,
  useGetBulkCourseProgressQuery,
} = userApi;
