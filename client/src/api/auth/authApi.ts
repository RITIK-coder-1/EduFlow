/* ----------------------------------------------------------------------------------------------
authApi.ts
This file does all the auth related API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice";
import {
  transformResponse,
  transformErrorResponse,
} from "../../utils/queryResponses";
import type {
  RegisterRequestBody,
  ResponseContract,
  UserContract,
} from "../../types/index.types";

// the API calls
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE REGISTER OTP
    registerOtp: builder.mutation<
      ResponseContract<{
        profilePic: string;
      }>,
      RegisterRequestBody
    >({
      query: (userData) => ({
        url: "/auth/register-otp",
        method: "POST",
        body: userData,
      }),
      transformResponse: transformResponse<{
        profilePic: string;
      }>(),
      transformErrorResponse,
    }),
    // VALIDATE THE OTP AND REGISTER THE USER
    register: builder.mutation<
      ResponseContract<UserContract>,
      RegisterRequestBody
    >({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse: transformResponse<UserContract>(),
      transformErrorResponse,
      invalidatesTags: ["User", "Stats", "Course"],
    }),

    // VALIDATE THE OTP AND LOGIN THE USER
    login: builder.mutation<
      ResponseContract<{
        existingUser: UserContract;
        accessToken: string;
      }>,
      { credential: string; password: string }
    >({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      transformResponse: transformResponse<{
        existingUser: UserContract;
        accessToken: string;
      }>(),
      transformErrorResponse,
      invalidatesTags: ["User", "Course"],
    }),

    // ISSUE A NEW TOKEN
    newToken: builder.mutation<ResponseContract<null>, void>({
      query: () => ({
        url: "/auth/token",
        method: "POST",
      }),
    }),

    // LOGOUT THE USER
    logout: builder.mutation<ResponseContract<null>, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformResponse: transformResponse<null>(),
      transformErrorResponse,
      invalidatesTags: ["User", "Course"],
    }),
  }),
});

export const {
  useRegisterOtpMutation,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useNewTokenMutation,
} = authApi;
