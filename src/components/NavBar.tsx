"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { logOut, selectCurrentTokens } from "@/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";

import Cookies from "js-cookie";
// import Link from "next/link";
import Simpson from "@/models/Simpson";
import useAuth from "@/hooks/useAuth";
import {
  Box,
  Button,
  ButtonProps,
  Container,
  Typography,
  styled,
} from "@mui/material";
import Link from "next/link";

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
        padding: "0 15px",
        position: "fixed",
        width: "100%",
        left: 0,
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        zIndex: 50,
      }}
    >
      <Container
        component={"div"}
        style={{
          maxWidth: "1600px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
          <Box
            component={"div"}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "2.5rem",
            }}
          >
            <Link href={"/onlater"}>
              <Typography
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00a2ff",
                  },
                }}
              >
                On Later
              </Typography>
            </Link>
            <Link href={"/liked"}>
              <Typography
                sx={{
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "#00a2ff",
                  },
                }}
              >
                Liked
              </Typography>
            </Link>

            <Button
              variant="outlined"
              sx={{ color: "white" }}
              onClick={handleLogout}
            >
              Log Out
            </Button>
          </Box>
        )}
      </Container>
    </header>
  );
};

export default NavBar;
