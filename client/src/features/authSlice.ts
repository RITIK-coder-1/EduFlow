/* ----------------------------------------------------------------------------------------------
authSlice.ts
Global State Management for authentication 
------------------------------------------------------------------------------------------------- */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ReduxUserStateContract } from "../types/index.types.ts";

/* ----------------------------------------------------------------------------------------------
Interface
------------------------------------------------------------------------------------------------- */

interface AuthStateContract {
  isAuthenticated: boolean;
  user: ReduxUserStateContract | null;
  accessToken: string | null;
}

/* ----------------------------------------------------------------------------------------------
the values
------------------------------------------------------------------------------------------------- */
let persistentUser = null;
if (localStorage.getItem("user")) {
  persistentUser = JSON.parse(localStorage.getItem("user") as string);
}

const initialState: AuthStateContract = {
  isAuthenticated: !!persistentUser,
  user: persistentUser,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        user: AuthStateContract["user"];
        accessToken: string;
      }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
    },
    disableUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
    },
  },
});

// export actions (auto generated)
export const { setUser, disableUser } = authSlice.actions;

// expore the reducer to configure store
export default authSlice.reducer;
