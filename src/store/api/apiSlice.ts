import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logOut, setTokens } from "@/features/auth/authSlice";

import Cookies from "js-cookie";

type BaseQueryArgs = Parameters<typeof baseQuery>[0];
type BaseQueryApi = Parameters<typeof baseQuery>[1];
type BaseQueryExtraOptions = Parameters<typeof baseQuery>[2];

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.tokens?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: BaseQueryArgs,
  api: BaseQueryApi,
  extraOptions: BaseQueryExtraOptions
) => {
  let result: any = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    // send the refresh token to get a new access token
    const state = api.getState() as RootState;

    const refreshData = await fetch(
      (process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh") as string,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const refreshResult: Tokens = await refreshData.json();

    if (refreshResult) {
      Cookies.set("tokens", JSON.stringify(refreshResult), {
        expires: 7,
      });
      // store the new token
      api.dispatch(setTokens({ tokens: refreshResult }));

      // retry the original query with the new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut({}));
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
