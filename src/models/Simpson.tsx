"use client";

import { useGLTF } from "@react-three/drei";
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

const Simpson = () => {
  const { scene } = useGLTF("/models/huinaebana.glb");
  const myMesh = useRef<Mesh>(null!);

  // mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // rotating func
  useFrame(() => {
    myMesh.current.rotation.y = mousePos.x / (window.innerWidth * 1.5);
    myMesh.current.rotation.x = mousePos.y / (window.innerHeight * 1.5);
  });

  return (
    <group>
      <mesh ref={myMesh} position={[0, -1, 0]} rotation={[0, 0, 0]} scale={1.5}>
        <primitive object={scene} />
        {/* <mesh scale={[0.01, 0.01, 1]} position={[0.074, 0.975, 0.5]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
        <mesh scale={[0.01, 0.01, 1]} position={[-0.074, 0.975, 0.5]}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh> */}
      </mesh>
    </group>
  );
};

export default Simpson;
