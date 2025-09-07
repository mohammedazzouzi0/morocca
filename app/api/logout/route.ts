import { NextResponse } from "next/server"

const ADMIN_COOKIE = "admin-auth"

export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/login", req.url))
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  })
  return res
}
