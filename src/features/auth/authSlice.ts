"use client";

import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

let accessToken: string = "";
if (typeof window !== "undefined" && localStorage.getItem("accessToken")) {
  accessToken = localStorage.getItem("accessToken") as string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {} as User,
    accessToken: accessToken,
    error: "",
  },
  reducers: {
    setTokens: (state, action) => {
      state.accessToken = action.payload;
    },
    logOut: (state, action) => {
      state.accessToken = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setTokens, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentTokens = (state: RootState) => state.auth.accessToken;
