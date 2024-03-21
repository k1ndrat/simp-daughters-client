"use client";

import NavBar from "@/components/NavBar";
import Episodes from "@/components/Episodes";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentEpisodes,
  setEpisodes,
} from "@/features/episode/episodeSlice";
import { useGetLikedEpisodesMutation } from "@/features/episode/episodeApiSlice";
import { useEffect } from "react";

export default function OnLater() {
  const isAuth = useAuth();

  const dispatch = useAppDispatch();
  const episodes: any = useAppSelector(selectCurrentEpisodes) || {};
  const [getEpisodes, { isLoading }] = useGetLikedEpisodesMutation();

  useEffect(() => {
    const getData = async () => {
      const data: any = await getEpisodes({});

      dispatch(setEpisodes({ episodes: data.data }));
    };

    isAuth && getData();
  }, [isAuth]);

  return (
    <>
      <NavBar />
      <main>
        <Episodes isLoading={isLoading} episodes={episodes} />
      </main>
    </>
  );
}