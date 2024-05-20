import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/", "/onlater", "/liked"];
const authRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  // social auth with searchParam
  const tokensParams = req.nextUrl.searchParams.get("tokens");

  if (tokensParams) {
    const response = NextResponse.redirect(req.nextUrl.origin);

    response.cookies.set("tokens", tokensParams, {
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }

  // cookies tokens
  let tokens = "";

  if (req.cookies.get("jwt")?.value) {
    tokens = req.cookies.get("jwt")?.value as string;
  }

  if (!tokens && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (tokens && authRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
}
