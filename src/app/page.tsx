"use client";

import styles from "./page.module.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Simpson from "../models/Simpson";
import { OrbitControls } from "@react-three/drei";

export default function Home() {
  return (
    <main
      className={styles.main}
      style={{
        // height: "100vh",
        // width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    ></main>
  );
}
