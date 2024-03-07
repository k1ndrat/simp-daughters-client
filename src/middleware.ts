import { NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/"];
const authRoutes = ["/login"];

export default function middleware(req: any) {
  let tokens = {} as Tokens;
  if (req.cookies.get("tokens")?.value) {
    tokens = JSON.parse(req.cookies.get("tokens")?.value as string);
  }

  if (!tokens?.accessToken && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  if (tokens?.accessToken && authRoutes.includes(req.nextUrl.pathname)) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }

  // if (!isAuth() && protectedRoutes.includes(req.nextUrl.pathname)) {
  //   const absoluteUrl = new URL("/login", req.nextUrl.origin);

  //   return NextResponse.redirect(absoluteUrl.toString());
  // }
}
