"use client";

import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    episodes: {} as Episodes,
  },
  reducers: {
    setEpisodes: (state, action) => {
      const { episodes } = action.payload;
      state.episodes = episodes;
    },
    resetEpisodes: (state, action) => {
      state.episodes = {} as Episodes;
    },
    likeEpisode: (
      state,
      action: { type: string; payload: { episode: Episode } }
    ) => {
      const { episode } = action.payload;
      state.episodes[episode.season] = state.episodes[episode.season].map(
        (ep) => {
          if (ep.episode === episode.episode)
            return {
              ...ep,
              state: {
                ...ep.state,
                isLiked: true,
              },
            } as Episode;
          return ep;
        }
      );
    },
  },
});

export const { setEpisodes, resetEpisodes, likeEpisode } = episodeSlice.actions;

export default episodeSlice.reducer;

export const selectCurrentEpisodes = (state: RootState) =>
  state.episode.episodes;
