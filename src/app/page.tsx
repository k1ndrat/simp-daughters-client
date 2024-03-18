"use client";

import "./globals.css";
import NavBar from "@/components/NavBar";
import Episodes from "@/components/Episodes";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Episodes />
      </main>
    </>
  );
}
