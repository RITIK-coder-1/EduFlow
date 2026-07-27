/* ----------------------------------------------------------------------------------------------
queryResponses.ts
This function provides the specific transformed responses for Redux Toolkit Query success and errors
------------------------------------------------------------------------------------------------- */

import { ApiErrorResponse, ApiSuccessResponse } from "../types/index.types.ts";

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
    response: ApiErrorResponse
  ): ResponseContract => {
    return {
      message: response?.message,
    };
  };

  return { transformResponse, transformErrorResponse };
}

export const { transformErrorResponse, transformResponse } = queryResponses();
