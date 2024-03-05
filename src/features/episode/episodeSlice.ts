"use client";

import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

const episodeSlice = createSlice({
  name: "episode",
  initialState: {
    episodes: {},
  },
  reducers: {
    setEpisodes: (state, action) => {
      const { episodes } = action.payload;
      state.episodes = episodes;
    },
    resetEpisodes: (state, action) => {
      state.episodes = {};
    },
  },
});

export const { setEpisodes, resetEpisodes } = episodeSlice.actions;

export default episodeSlice.reducer;

export const selectCurrentEpisodes = (state: RootState) =>
  state.episode.episodes;
