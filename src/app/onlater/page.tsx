"use client";

import NavBar from "@/components/NavBar";
import Episodes from "@/components/Episodes";
import { useGetOnLaterEpisodesQuery } from "@/features/episode/episodeApiSlice";

export default function OnLater() {
  const { data, isLoading, isSuccess } = useGetOnLaterEpisodesQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <>
      <NavBar />
      <main>
        <Episodes
          isLoading={isLoading}
          episodes={data}
          usePercentage={false}
          isSuccess={isSuccess}
        />
      </main>
    </>
  );
}
