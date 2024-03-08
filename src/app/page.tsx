"use client";

import { useEffect, useOptimistic } from "react";
import "./globals.css";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentEpisodes,
  setEpisodes,
} from "@/features/episode/episodeSlice";
import { useGetEpisodesMutation } from "@/features/episode/episodeApiSlice";
import EpisodeSeasonItem from "@/components/EpisodeSeasonItem";
import { Box, Container } from "@mui/material";

export default function Home() {
  const isAuth = useAuth();

  const dispatch = useAppDispatch();
  const episodes: any = useAppSelector(selectCurrentEpisodes) || {};
  const [getEpisodes] = useGetEpisodesMutation();

  const [optimisticEpisodes, setOptimisticEpisodes] = useOptimistic(episodes);

  useEffect(() => {
    const getData = async () => {
      const data: any = await getEpisodes({});

      dispatch(setEpisodes({ episodes: data.data }));
    };

    getData();
  }, []);

  return (
    <main style={{}}>
      <Container
        style={{
          margin: "7rem auto 0",
          padding: "0 15px",
          maxWidth: "1500px",
          paddingTop: "50px",
          paddingBottom: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {Object.keys(episodes).length !== 0 &&
          Object.keys(episodes).map((key) => (
            <EpisodeSeasonItem
              key={key}
              episodes={episodes[key]}
              season={key}
              setOptimisticEpisodes={setOptimisticEpisodes}
            />
          ))}
      </Container>
    </main>
  );
}
