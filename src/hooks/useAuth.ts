"use client";

import { selectCurrentTokens } from "@/features/auth/authSlice";
import { useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const tokens = useAppSelector(selectCurrentTokens);

  useEffect(() => {
    setIsAuth(Object.keys(tokens).length !== 0);
  }, [tokens]);

  return isAuth;
};

export default useAuth;
