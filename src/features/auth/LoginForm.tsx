"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";
import { useAppDispatch } from "@/store/hooks";
import { setTokens } from "./authSlice";

import Cookies from "js-cookie";
import useAuth from "@/hooks/useAuth";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";
import TextInput from "@/components/TextInput";
import Link from "next/link";

interface CredType {
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface IAlertSettings {
  open: boolean;
  text: string;
  severity: AlertColor;
}

const LoginForm = () => {
  const [credentials, setCredentials] = useState<CredType>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [type, setType] = useState<"Login" | "Register">("Login");
  const [alertSettings, setAlertSettings] = useState<IAlertSettings>({
    open: false,
    text: "",
    severity: "success",
  });
  const isRegister = type === "Register";

  const [login] = useLoginMutation();
  const [register] = useRegisterMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuth } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    handleClose();

    if (isRegister) {
      await registerForm();
    } else {
      await loginForm();
    }
  };

  const loginForm = async () => {
    try {
      const tokens = await login({
        email: credentials.email,
        password: credentials.password,
      }).unwrap();

      console.log(tokens);

      dispatch(setTokens({ tokens }));
      Cookies.set("tokens", JSON.stringify(tokens), { expires: 7 });

      router.push("/");
    } catch (error: any) {
      let result;
      if (Array.isArray(error.data.message)) {
        result = error.data.message[0];
      } else {
        result = error.data.message;
      }

      result = result.charAt(0).toUpperCase() + result.slice(1);
      setAlertSettings({
        open: true,
        text: result,
        severity: "error",
      });
    }
  };

  const registerForm = async () => {
    if (credentials.password === credentials.confirmPassword) {
      try {
        const tokens = await register({
          name: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }).unwrap();

        setType("Login");

        setAlertSettings({
          open: true,
          text: "You are successfully registered!",
          severity: "success",
        });
      } catch (error: any) {
        let result;
        if (Array.isArray(error.data.message)) {
          result = error.data.message[0];
        } else {
          result = error.data.message;
        }

        result = result.charAt(0).toUpperCase() + result.slice(1);
        setAlertSettings({
          open: true,
          text: result,
          severity: "error",
        });
      }
    } else {
      setAlertSettings({
        open: true,
        text: "Passwords doesn`t match!",
        severity: "error",
      });
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertSettings((prev) => ({
      ...prev,
      open: false,
    }));
  };

  useEffect(() => {
    console.log(isAuth);

    isAuth && router.push("/");
  }, [isAuth]);

  return (
    <motion.form
      autoComplete="new-password"
      initial={{ x: -800, scale: 0.75, opacity: 0 }}
      animate={{ x: 0, scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 50,
        // damping: 20,
        delay: 1.25,
        duration: 1,
      }}
      onSubmit={handleSubmit}
      style={{
        maxWidth: "700px",
        width: "100vw",
        minWidth: "290px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1.25rem",
        padding: "2rem",
        color: "white !important",
      }}
    >
      <Snackbar
        open={alertSettings.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={alertSettings.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {alertSettings.text}
        </Alert>
      </Snackbar>

      <Typography variant="h2" sx={{ textTransform: "uppercase" }}>
        {isRegister ? "Sign Up" : "Login"}
      </Typography>

      {isRegister && (
        <TextInput
          color="secondary"
          type="text"
          label="Username"
          name="Username"
          placeholder="Input username"
          value={credentials.username}
          onChange={(e) => {
            setCredentials((prev) => ({
              ...prev,
              username: e.target.value,
            }));
          }}
        />
      )}

      <TextInput
        type="email"
        name="email"
        label="Email"
        placeholder="Input email"
        variant="outlined"
        value={credentials.email}
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, email: e.target.value }));
        }}
      />

      <TextInput
        color="secondary"
        label="Password"
        type="password"
        name="password"
        placeholder="Input password"
        value={credentials.password}
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, password: e.target.value }));
        }}
      />

      {isRegister && (
        <TextInput
          color="secondary"
          type="password"
          label="Confirm Password"
          name="confirm-password"
          placeholder="Input password"
          value={credentials.confirmPassword}
          onChange={(e) => {
            setCredentials((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }));
          }}
        />
      )}

      <Button
        type="submit"
        color="secondary"
        variant="outlined"
        sx={{
          color: "white",
          padding: "1rem",
        }}
      >
        {isRegister ? "Sign Up" : "Login"}
      </Button>

      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/google`}>
        <Button
          type="button"
          color="secondary"
          variant="outlined"
          sx={{
            width: "100%",
            color: "white",
            padding: "1rem",
          }}
        >
          GOOGLE
        </Button>
      </Link>

      {/* <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/facebook`}>
        <Button
          type="button"
          color="secondary"
          variant="outlined"
          sx={{
            width: "100%",
            color: "white",
            padding: "1rem",
          }}
        >
          Facebook
        </Button>
      </Link> */}

      <Button
        type="button"
        sx={{
          color: "white",
          padding: "1rem",
          // justifyContent: "flex-start",
          // textTransform: "none",
        }}
        onClick={() => {
          setCredentials({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          if (isRegister) {
            setType("Login");
          } else {
            setType("Register");
          }
        }}
      >
        {isRegister
          ? "Already have account? Login!"
          : "Don't have an account? Sign Up!"}
      </Button>
    </motion.form>
  );
};

export default LoginForm;
