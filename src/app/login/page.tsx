"use client";

import LoginForm from "@/features/auth/LoginForm";
import { Box, IconButton } from "@mui/material";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useState } from "react";

const LoginPage = () => {
  const [isMute, setIsMute] = useState<boolean>(true);

  const handleMute = () => {
    setIsMute((prev) => !prev);
  };

  return (
    <Box
      component={"div"}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        justifyContent: "flex-start",
      }}
    >
      <video
        autoPlay
        muted={isMute}
        loop
        src="/videos/intro.mp4"
        style={{
          objectFit: "cover",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -1,
        }}
      ></video>
      <span
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: -1,
          backgroundColor: "rgba(0,0,0,0.6)",
        }}
      ></span>
      <IconButton
        onClick={handleMute}
        sx={{
          position: "absolute",
          right: "2rem",
          top: "2rem",
        }}
      >
        {isMute ? (
          <VolumeOffIcon
            sx={{
              fontSize: "3rem",
              color: "white",
            }}
          />
        ) : (
          <VolumeUpIcon
            sx={{
              fontSize: "3rem",
              color: "white",
            }}
          />
        )}
      </IconButton>
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
