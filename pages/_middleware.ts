import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const cookie = req.cookies["auth"];

  if (!cookie) {
    return NextResponse.redirect("/login");
  }

  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET!,
  });

  const { pathname }: { pathname: string } = req.nextUrl;

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
    return NextResponse.redirect(process.env.NEXTAUTH_URL + "/login");
  }
}
