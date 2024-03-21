import { useGetEpisodesMutation } from "@/features/episode/episodeApiSlice";
import {
  selectCurrentEpisodes,
  setEpisodes,
} from "@/features/episode/episodeSlice";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Container } from "@mui/material";
import React, { useEffect } from "react";
import EpisodeSeasonItem from "./EpisodeSeasonItem";
import Loader from "./Loader";

const Episodes = ({ isLoading, episodes }: any) => {
  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
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
      )}
    </>
  );
};

export default Episodes;
