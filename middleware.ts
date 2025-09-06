import { NextResponse, type NextRequest } from "next/server"

const ADMIN_COOKIE = "admin-auth"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginRoute = pathname === "/login"

  const hasAuth = request.cookies.get(ADMIN_COOKIE)?.value === "1"

  if (isAdminRoute && !hasAuth) {
    const url = request.nextUrl.clone()
    url.pathname = "/login"
    url.searchParams.set("returnTo", pathname)
    return NextResponse.redirect(url)
  }

  if (isLoginRoute && hasAuth) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
}
