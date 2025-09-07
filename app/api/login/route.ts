import { NextResponse } from "next/server"

const ADMIN_COOKIE = "admin-auth"
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || ""

  let username = ""
  let password = ""
  let returnTo = "/admin"

  if (contentType.includes("application/json")) {
    const body = await req.json().catch(() => ({}))
    username = body.username || ""
    password = body.password || ""
    returnTo = body.returnTo || "/admin"
  } else {
    const form = await req.formData()
    username = (form.get("username") as string) || ""
    password = (form.get("password") as string) || ""
    returnTo = ((form.get("returnTo") as string) || "/admin").toString()
  }

  const expectedUser = process.env.ADMIN_USERNAME || "admin"
  const expectedPass = process.env.ADMIN_PASSWORD || "admin123"

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 })
  }

  const res = NextResponse.redirect(new URL(returnTo, req.url))
  res.cookies.set({
    name: ADMIN_COOKIE,
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE,
  })

  return res
}
