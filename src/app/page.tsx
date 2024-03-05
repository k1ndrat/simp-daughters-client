"use client";

import { useEffect } from "react";
// import styles from "./page.module.css";
import styles from "./globals.css";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentEpisodes,
  setEpisodes,
} from "@/features/episode/episodeSlice";
import { useGetEpisodesMutation } from "@/features/episode/episodeApiSlice";
import EpisodeSeasonItem from "@/components/EpisodeSeasonItem";

export default function Home() {
  const isAuth = useAuth();

  const dispatch = useAppDispatch();
  const episodes: any = useAppSelector(selectCurrentEpisodes);
  const [getEpisodes] = useGetEpisodesMutation();

  useEffect(() => {
    const getData = async () => {
      const data: any = await getEpisodes({});

      dispatch(setEpisodes({ episodes: data.data }));
    };

    getData();
  }, []);

  return (
    <main className={styles.main} style={{}}>
      <section
        style={{
          margin: "0 auto",
          maxWidth: "1300px",
          paddingTop: "50px",
          paddingBottom: "50px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "50px",
        }}
      >
        {Object.keys(episodes).map((key) => (
          <EpisodeSeasonItem season={episodes[key]} />
        ))}
      </section>
    </main>
  );
}
