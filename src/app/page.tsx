"use client";

import { useEffect } from "react";
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
import NavBar from "@/components/NavBar";

export default function Home() {
  const isAuth = useAuth();

  const dispatch = useAppDispatch();
  const episodes: any = useAppSelector(selectCurrentEpisodes) || {};
  const [getEpisodes] = useGetEpisodesMutation();

  useEffect(() => {
    const getData = async () => {
      const data: any = await getEpisodes({});

      dispatch(setEpisodes({ episodes: data.data }));
    };

    getData();
  }, [isAuth]);

  return (
    <>
      <NavBar />
      <main style={{}}>
        <Container
          style={{
            margin: "7rem auto 0",
            padding: "0 15px",
            maxWidth: "1400px",
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
              />
            ))}
        </Container>
      </main>
    </>
  );
}
