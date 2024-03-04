"use client";

import Cookies from "js-cookie";

export const isAuth = () => {
  if (Cookies.get("tokens")) {
    const tokens: Tokens = JSON.parse(Cookies.get("tokens") as string);

    if (tokens.accessToken) {
      return true;
    }
  }

  return false;
};
