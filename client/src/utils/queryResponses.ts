/* ----------------------------------------------------------------------------------------------
queryResponses.ts
This function provides the specific transformed responses for Redux Toolkit Query success and errors
------------------------------------------------------------------------------------------------- */

interface ResponseContract {
  data?: unknown;
  message: string;
}

function queryResponses() {
  // success response
  const transformResponse = (response): ResponseContract => {
    return {
      data: response?.data,
      message: response?.message,
    };
  };

  // error response
  const transformErrorResponse = (response): ResponseContract => {
    return {
      message: response?.data?.message,
    };
  };

  return { transformResponse, transformErrorResponse };
}

export const { transformErrorResponse, transformResponse } = queryResponses();
