"use client";

import "./globals.css";
import NavBar from "@/components/NavBar";
import Episodes from "@/components/Episodes";
import { useGetEpisodesQuery } from "@/features/episode/episodeApiSlice";

export default function Home() {
  const { data, isLoading, isSuccess, error } = useGetEpisodesQuery(null, {
    refetchOnMountOrArgChange: 0,
  });

  return (
    <>
      <NavBar />
      <main>
        <Episodes
          isLoading={isLoading}
          episodes={data}
          isSuccess={isSuccess}
          error={error}
        />
      </main>
    </>
  );
}
