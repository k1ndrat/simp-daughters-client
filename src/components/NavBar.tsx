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
import { Button, ButtonProps, styled } from "@mui/material";

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

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "white",
    backgroundColor: "rgb(156, 39, 176)",
    "&:hover": {
      backgroundColor: "#7B1FA2",
    },
  }));

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1600px",
        margin: "0 auto",
        padding: "0 15px",
        position: "fixed",
        width: "100%",
        left: 0,
        t: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 50,
      }}
    >
      <Link
        href={"/"}
        style={{
          width: "75px",
          overflow: "none",
        }}
      >
        <Canvas
          camera={{ fov: 30, near: 0.1, far: 1000 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "none",
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
      {isAuth && (
        <>
          <Button
            variant="outlined"
            // sx={{ color: "white" }}
            onClick={handleLogout}
          >
            Log Out
          </Button>
          {/* <ColorButton variant="contained">Suka</ColorButton> */}
        </>
      )}
    </header>
  );
};

export default NavBar;
