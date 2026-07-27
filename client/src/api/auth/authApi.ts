/* ----------------------------------------------------------------------------------------------
authApi.ts
This file does all the auth related API calls 
------------------------------------------------------------------------------------------------- */

import apiSlice from "../base/apiSlice.js";
import {
  transformResponse,
  transformErrorResponse,
} from "../../utils/queryResponses.ts";
import type {
  RegisterRequestBody,
  UserContract,
} from "../../types/index.types.ts";

// the API calls
const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // CREATE REGISTER OTP
    registerOtp: builder.mutation({
      query: (userData: RegisterRequestBody) => ({
        url: "/auth/register-otp",
        method: "POST",
        body: userData,
      }),
      transformResponse,
      transformErrorResponse,
    }),
    // VALIDATE THE OTP AND REGISTER THE USER
    register: builder.mutation({
      query: (userData: UserContract) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: ["User", "Stats", "Course"],
    }),

    // VALIDATE THE OTP AND LOGIN THE USER
    login: builder.mutation({
      query: (userData: { credential: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      transformResponse,
      transformErrorResponse,
      invalidatesTags: ["User", "Course"],
    }),

    // ISSUE A NEW TOKEN
    newToken: builder.mutation({
      query: () => ({
        url: "/auth/token",
        method: "POST",
      }),
    }),

    // LOGOUT THE USER
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      transformResponse,
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
