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
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import { motion } from "framer-motion";

interface CredType {
  username: string;
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
  const isAuth = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isRegister) {
      await registerForm();
    } else {
      await loginForm();
    }
  };

  const loginForm = async () => {
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

  const registerForm = async () => {
    if (credentials.password === credentials.confirmPassword) {
      try {
        const tokens = await register({
          name: credentials.username,
          email: credentials.username,
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
    event: React.SyntheticEvent | Event,
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
        height: "100vh",
        maxWidth: "700px",
        // width: "50vw",
        // minWidth: "290px",
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

      <TextField
        // color="secondary"
        autoComplete="new-password"
        type="text"
        name="username"
        // label="Username"
        placeholder="Input username"
        variant="outlined"
        value={credentials.username}
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, username: e.target.value }));
        }}
        sx={{
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)",
              transition: "all 0.3s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.8)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(255, 255, 255, 1)",
            },
          },
        }}
      />
      <TextField
        autoComplete="new-password"
        color="secondary"
        type="password"
        name="password"
        placeholder="Input password"
        value={credentials.password}
        onChange={(e) => {
          setCredentials((prev) => ({ ...prev, password: e.target.value }));
        }}
        sx={{
          input: { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.5)",
              transition: "all 0.3s ease",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.8)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(255, 255, 255, 1)",
            },
          },
        }}
      />

      {isRegister && (
        <TextField
          autoComplete="new-password"
          color="secondary"
          type="password"
          name="confirm-password"
          placeholder="Input password"
          value={credentials.confirmPassword}
          onChange={(e) => {
            setCredentials((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }));
          }}
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(255, 255, 255, 0.5)",
                transition: "all 0.3s ease",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255, 255, 255, 0.8)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "rgba(255, 255, 255, 1)",
              },
            },
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

      <Typography
        sx={{
          userSelect: "none",
          cursor: "pointer",
        }}
        onClick={() => {
          if (isRegister) {
            setType("Login");
          } else {
            setType("Register");
          }
        }}
      >
        {isRegister
          ? "Already have account? Pls login!"
          : "Don`t have account? Pls create it!"}
      </Typography>
    </motion.form>
  );
};

export default LoginForm;
