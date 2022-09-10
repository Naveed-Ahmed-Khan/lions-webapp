import { NextResponse } from "next/server";

export function middleware(request) {
  const {
    nextUrl: { pathname },
  } = request;
  // console.log(request.nextUrl.pathname);
  const token = request.cookies.get("token");
  const admin = request.cookies.get("admin");

  if (
    !token &&
    (pathname.startsWith("/edit-profile") ||
      pathname.startsWith("/applied-jobs") ||
      pathname.startsWith("/my-application") ||
      pathname.startsWith("/my-jobs") ||
      pathname.startsWith("/view-applicants"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    token &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!admin && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
