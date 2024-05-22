"use client";

import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";

// get tokens from cookies
let tokens = {} as Tokens;
if (Cookies.get("tokens")) {
  tokens = JSON.parse(Cookies.get("tokens") as string);
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: tokens.user,
    tokens: tokens,
    error: "",
  },
  reducers: {
    setTokens: (state, action) => {
      state.tokens = action.payload;
    },
    logOut: (state, action) => {
      state.tokens = {} as Tokens;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setTokens, logOut, setUser } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectCurrentTokens = (state: RootState) => state.auth.tokens;
