import { NextResponse } from "next/server";

export function middleware(request) {
  const {
    nextUrl: { pathname },
  } = request;
  // console.log(request.nextUrl.pathname);
  const token = request.cookies.get("token");
  const userType = request.cookies.get("user");

  if (
    !token &&
    (userType === "tutor" || userType === "student") &&
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
    (userType === "tutor" || userType === "student") &&
    (pathname.startsWith("/login") || pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (userType !== "admin" && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}
