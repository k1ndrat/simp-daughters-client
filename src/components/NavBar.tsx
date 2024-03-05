"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { logOut, selectCurrentTokens } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";

import Cookies from "js-cookie";
import Link from "next/link";
import Simpson from "@/models/Simpson";
import useAuth from "@/hooks/useAuth";

const NavBar = () => {
  const router = useRouter();

  const isAuth = useAuth();
  // const [isAuth, setIsAuth] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  // const tokens = useAppSelector(selectCurrentTokens);

  const handleLogout = () => {
    Cookies.remove("tokens");
    dispatch(logOut({}));

    router.push("/login");
  };

  // useEffect(() => {
  //   setIsAuth(Object.keys(tokens).length !== 0);
  // }, [tokens]);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href={"/"} style={{ width: "200px" }}>
        <Canvas
          camera={{ fov: 30, near: 0.1, far: 1000 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: "wheat",
          }}
        >
          <Suspense fallback={"loading"}>
            {/* <OrbitControls /> */}
            <directionalLight intensity={2} />
            <hemisphereLight intensity={0.5} />
            {/* <directionalLight
            color="orange"
            position={[0, 0, 5]}
            intensity={0.2}
          /> */}

            <Simpson />
          </Suspense>
        </Canvas>
      </Link>
      {isAuth && <button onClick={handleLogout}>Log Out</button>}
    </header>
  );
};

export default NavBar;
