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
    tokens: tokens,
    error: "",
  },
  reducers: {
    setTokens: (state, action) => {
      const { tokens } = action.payload;
      state.tokens = tokens;
    },
    logOut: (state, action) => {
      state.tokens = {} as Tokens;
      // Cookies.remove("tokens");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTokens, logOut, setError } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.tokens.user;
export const selectCurrentTokens = (state: RootState) => state.auth.tokens;
