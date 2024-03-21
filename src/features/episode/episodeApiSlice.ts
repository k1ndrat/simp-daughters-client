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
    getOnLaterEpisodes: builder.mutation({
      query: () => ({
        url: "/episode/onlater",
        method: "GET",
      }),
    }),
    getLikedEpisodes: builder.mutation({
      query: () => ({
        url: "/episode/liked",
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

export const {
  useGetEpisodesMutation,
  useUpdateStateMutation,
  useGetOnLaterEpisodesMutation,
  useGetLikedEpisodesMutation,
} = episodeApiSlice;
