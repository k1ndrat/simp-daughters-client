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
    updateState: builder.mutation({
      query: (credentials) => ({
        url: `/episode/state/${credentials.episodeId}`,
        method: "POST",
        body: credentials.state,
      }),
    }),
  }),
});

export const { useGetEpisodesMutation, useUpdateStateMutation } =
  episodeApiSlice;
