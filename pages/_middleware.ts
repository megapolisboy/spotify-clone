import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getSession({ req });

  const { pathname }: { pathname: string } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
