"use client";

import { apiSlice } from "@/store/api/apiSlice";

export const episodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.mutation({
      query: () => ({
        url: "/episode",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetEpisodesMutation } = episodeApiSlice;
