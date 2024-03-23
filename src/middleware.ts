import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/"];
const authRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  let tokens = {} as Tokens;

  //
  let refreshToken = req.nextUrl.searchParams.get("refreshToken");

  if (refreshToken) {
    const data = await fetch(
      (process.env.NEXT_PUBLIC_BASE_URL + "/auth/refresh") as string,
      {
        method: "POST",
        headers: {
          authorization: `REFRESH ${refreshToken}`,
        },
      }
    );

    const res = await data.json();

    const response = NextResponse.redirect(req.nextUrl.origin);
    response.cookies.set("tokens", JSON.stringify(res));
    return response;
  }

  // cookies tokens
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
}
