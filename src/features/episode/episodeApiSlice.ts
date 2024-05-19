"use client";

import { apiSlice } from "@/store/api/apiSlice";

export const episodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.query<Episodes, null>({
      query: () => ({ url: `/episode` }),
    }),
    getOnLaterEpisodes: builder.query<Episodes, null>({
      query: () => ({ url: `/episode/onlater` }),
    }),
    getLikedEpisodes: builder.query<Episodes, null>({
      query: () => ({ url: `/episode/liked` }),
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
  useGetEpisodesQuery,
  useUpdateStateMutation,
  useGetOnLaterEpisodesQuery,
  useGetLikedEpisodesQuery,
} = episodeApiSlice;
