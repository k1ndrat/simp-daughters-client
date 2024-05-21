"use client";

import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

// let accessToken: string = "";
// if (typeof window !== "undefined" && localStorage.getItem("accessToken")) {
//   accessToken = localStorage.getItem("accessToken") as string;
// }

// get tokens from cookies
let tokens = {} as Tokens;
if (Cookies.get("tokens")) {
  tokens = JSON.parse(Cookies.get("tokens") as string);
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {} as User,
    accessToken: tokens.accessToken,
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
