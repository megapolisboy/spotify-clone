import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const cookie = req.cookies["auth"];

  const { pathname }: { pathname: string } = req.nextUrl;

  if (pathname.includes("/api/auth") || cookie) {
    return NextResponse.next();
  }

  if (!cookie && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
