"use client";

import "./globals.css";
import NavBar from "@/components/NavBar";
import Episodes from "@/components/Episodes";
import { useGetEpisodesQuery } from "@/features/episode/episodeApiSlice";

export default function Home() {
  const { data, isLoading, isSuccess } = useGetEpisodesQuery(null);

  return (
    <>
      <NavBar />
      <main>
        <Episodes isLoading={isLoading} episodes={data} isSuccess={isSuccess} />
      </main>
    </>
  );
}
