"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "./authApiSlice";
import { useAppDispatch } from "@/store/hooks";
import { setTokens } from "./authSlice";

import Cookies from "js-cookie";
import useAuth from "@/hooks/useAuth";

interface CredType {
  username: string;
  password: string;
}

const Login = () => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, username: e.target.value }));
          }}
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={(e) => {
            setCredentials((prev) => ({ ...prev, password: e.target.value }));
          }}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
