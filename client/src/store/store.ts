/* ----------------------------------------------------------------------------------------------
store.ts
This file stores every single redux state 
------------------------------------------------------------------------------------------------- */

import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../api/base/apiSlice";
import { authReducer } from "../features/index.features";
import userListener from "../middleware/userLocalStorage";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .prepend(userListener.middleware),
});

// extracting the RootState type dynamically from the store itself
export type RootState = ReturnType<typeof store.getState>;

// extracting AppDispatch for typing useDispatch as well
export type AppDispatch = typeof store.dispatch;
