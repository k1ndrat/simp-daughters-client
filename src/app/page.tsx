"use client";

import "./globals.css";
import NavBar from "@/components/NavBar";
import Episodes from "@/components/Episodes";
import useAuth from "@/hooks/useAuth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCurrentEpisodes,
  setEpisodes,
} from "@/features/episode/episodeSlice";
import { useGetEpisodesMutation } from "@/features/episode/episodeApiSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const isAuth = useAuth();

  const dispatch = useAppDispatch();
  const episodes: any = useAppSelector(selectCurrentEpisodes);
  const [getEpisodes, { isLoading, status }] = useGetEpisodesMutation();

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      const data: any = await getEpisodes({});

      dispatch(setEpisodes({ episodes: data.data }));
    };

    isAuth && getData();

    // remove hash from facebook redirect
    if (window.location.hash === "#_=_") {
      router.push("/");
    }
  }, [isAuth]);

  return (
    <>
      <NavBar />
      <main>
        <Episodes isLoading={isLoading} episodes={episodes} status={status} />
      </main>
    </>
  );
}
