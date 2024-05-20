"use client";

import { apiSlice } from "@/store/api/apiSlice";

export const episodeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEpisodes: builder.query<Episodes, null>({
      query: () => ({ url: `/episode` }),
      providesTags: ["LikedEpisodes"],
    }),
    getOnLaterEpisodes: builder.query<Episodes, null>({
      query: () => ({ url: `/episode/onlater` }),
      providesTags: ["LikedEpisodes"],
    }),
    getLikedEpisodes: builder.query<Episodes, null>({
      query: () => ({ url: `/episode/liked` }),
      providesTags: ["LikedEpisodes"],
    }),
    updateState: builder.mutation({
      query: (credentials) => ({
        url: `/episode/state/${credentials.episodeId}`,
        method: "POST",
        body: credentials.state,
      }),
      // invalidatesTags: ["LikedEpisodes"],
    }),
  }),
});

export const {
  useGetEpisodesQuery,
  useUpdateStateMutation,
  useGetOnLaterEpisodesQuery,
  useGetLikedEpisodesQuery,
} = episodeApiSlice;
