"use client";

import Cookies from "js-cookie";

import { apiSlice } from "@/store/api/apiSlice";
import { setTokens } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    me: builder.mutation({
      query: (credentials) => ({
        url: `user/${credentials.id}`,
        method: "GET",
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const tokens = data.detail.response;
          dispatch(setTokens({ tokens }));
          Cookies.set("tokens", JSON.stringify(tokens), {
            expires: 7,
          });
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeMutation,
  useRefreshMutation,
} = authApiSlice;
