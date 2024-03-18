"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "./authApiSlice";
import { useAppDispatch } from "@/store/hooks";
import { setTokens } from "./authSlice";

import Cookies from "js-cookie";
import useAuth from "@/hooks/useAuth";
import { Button, TextField, Typography } from "@mui/material";

import { motion } from "framer-motion";

interface CredType {
  username: string;
  password: string;
}

const LoginForm = () => {
  const [credentials, setCredentials] = useState<CredType>({
    username: "",
    password: "",
  });

  const [login] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuth = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const tokens = await login({
        username: credentials.username,
        password: credentials.password,
      }).unwrap();

      console.log(tokens);

      dispatch(setTokens({ tokens }));
      Cookies.set("tokens", JSON.stringify(tokens), { expires: 7 });

      router.push("/");
    } catch (error) {}
  };

  useEffect(() => {
    console.log(isAuth);

    isAuth && router.push("/");
  }, [isAuth]);

  return (
    <motion.form
      autoComplete="false"
      initial={{ x: -800, scale: 1 }}
      animate={{ x: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 50,
        // damping: 20,
        delay: 1,
        duration: 1,
      }}
      onSubmit={handleSubmit}
      style={{
        height: "100vh",
        maxWidth: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
        color: "white !important",
      }}
    >
      <Typography variant="h2" sx={{ textTransform: "uppercase" }}>
        Login
      </Typography>

      <TextField
        // color="secondary"
        autoComplete="false"
        type="text"
        name="username"
        // label="Username"
        variant="outlined"
        value={credentials.username}
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, username: e.target.value }));
        }}
        sx={{
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              // borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.7)",
              transition: "all 0.3s ease",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(255, 255, 255, 0.9)",
            },
          },
        }}
      />
      <TextField
        autoComplete="false"
        color="secondary"
        type="password"
        name="password"
        value={credentials.password}
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, password: e.target.value }));
        }}
        sx={{
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              // borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.7)",
              transition: "all 0.3s ease",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(255, 255, 255, 0.9)",
            },
          },
        }}
      />

      <Button
        type="submit"
        color="secondary"
        variant="outlined"
        sx={{
          color: "white",
          padding: "1rem",
        }}
      >
        Login
      </Button>
    </motion.form>
  );
};

export default LoginForm;
