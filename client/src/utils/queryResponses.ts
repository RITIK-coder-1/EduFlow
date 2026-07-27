/* ----------------------------------------------------------------------------------------------
queryResponses.ts
This function provides the specific transformed responses for Redux Toolkit Query success and errors
------------------------------------------------------------------------------------------------- */

import { ApiSuccessResponse } from "../types/index.types.ts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

interface ResponseContract {
  data?: unknown;
  message: string;
}

function queryResponses() {
  // success response
  const transformResponse = (
    response: ApiSuccessResponse<unknown>
  ): ResponseContract => {
    return {
      data: response?.data,
      message: response?.message,
    };
  };

  // error response
  const transformErrorResponse = (
    error:
      | FetchBaseQueryError
      | SerializedError
      | { data?: { message?: string } }
  ): ResponseContract => {
    let errorMessage = "An unexpected error occurred";

    if ("data" in error && error.data && typeof error.data === "object") {
      const serverError = error.data as { message?: string };
      if (serverError.message) {
        errorMessage = serverError.message;
      }
    } else if ("message" in error && error.message) {
      errorMessage = error.message;
    }

    return {
      message: errorMessage,
    };
  };

  return { transformResponse, transformErrorResponse };
}

export const { transformErrorResponse, transformResponse } = queryResponses();
