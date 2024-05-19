"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation, useRegisterMutation } from "./authApiSlice";
import { Alert, AlertColor, Button, Snackbar, Typography } from "@mui/material";
import { motion } from "framer-motion";
import TextInput from "@/components/TextInput";
import Link from "next/link";

interface IAlertSettings {
  open: boolean;
  text: string;
  severity: AlertColor;
}

const LoginForm = () => {
  const router = useRouter();

  const [credentials, setCredentials] = useState<ICredentials>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [type, setType] = useState<"Login" | "Register">("Login");
  const isRegister = type === "Register";

  const [alertSettings, setAlertSettings] = useState<IAlertSettings>(
    {} as IAlertSettings
  );

  const [
    login,
    { error: loginErorr, isError: isLoginError, isSuccess: isLoginSuccess },
  ] = useLoginMutation();
  const [
    register,
    {
      error: registerErorr,
      isError: isRegisterError,
      isSuccess: isRegisterSuccess,
    },
  ] = useRegisterMutation();

  // submit form
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleClose();

    if (isRegister) {
      if (credentials.password === credentials.confirmPassword) {
        await register({
          name: credentials.username,
          email: credentials.email,
          password: credentials.password,
        });
      } else {
        setAlertSettings({
          open: true,
          text: "Passwords doesn`t match!",
          severity: "error",
        });
      }
    } else {
      await login({
        email: credentials.email,
        password: credentials.password,
      });
    }
  };

  // func for creating alert for error
  const handleError = (error: IError) => {
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
  };

  // close alert
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

  // when user is logged in push to main page
  isLoginSuccess && router.push("/");

  // when error run func for creating alert
  useEffect(() => {
    if (!isRegister && isLoginError && loginErorr) {
      handleError(loginErorr);
    } else if (isRegister && isRegisterError && registerErorr) {
      handleError(registerErorr);
    }
  }, [isLoginError, isRegisterError, loginErorr, registerErorr]);

  // when user is registered propose login and create alert
  useEffect(() => {
    if (isRegisterSuccess) {
      setType("Login");

      setAlertSettings({
        open: true,
        text: "You are successfully registered!",
        severity: "success",
      });
    }
  }, [isRegisterSuccess]);

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
