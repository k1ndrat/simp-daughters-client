"use client";

import { apiSlice } from "@/store/api/apiSlice";
import { logOut, setTokens, setUser } from "./authSlice";
import Cookies from "js-cookie";

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
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: Tokens } = await queryFulfilled;

          dispatch(setTokens(data));
          dispatch(setUser(data.user));

          Cookies.set("tokens", JSON.stringify(data), { expires: 7 });
        } catch (error) {}
      },
    }),
    me: builder.mutation({
      query: (credentials) => ({
        url: `user/me`,
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: User } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {}
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data }: { data: Tokens } = await queryFulfilled;
          dispatch(setTokens(data));
          dispatch(setUser(data.user));

          Cookies.set("tokens", JSON.stringify(data), { expires: 7 });
        } catch (err) {}
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(logOut(null));

          Cookies.remove("tokens");
        } catch (err) {}
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeMutation,
  // useRefreshMutation,
  useLogoutMutation,
} = authApiSlice;
