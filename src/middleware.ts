import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;

  if (pathname.startsWith("/podcasting")) {
    const destinationUrl = new URL(pathname + url.search, "https://binary-podcasting.vercel.app");
    const response = NextResponse.rewrite(destinationUrl);
    response.headers.set("host", "binary-podcasting.vercel.app");
    return response;
  }

  if (pathname.startsWith("/launch-videos")) {
    const destinationUrl = new URL(pathname + url.search, "https://binary-launch-videos.vercel.app");
    const response = NextResponse.rewrite(destinationUrl);
    response.headers.set("host", "binary-launch-videos.vercel.app");
    return response;
  }

  if (pathname.startsWith("/clipping")) {
    const destinationUrl = new URL(pathname + url.search, "https://binary-clipping.vercel.app");
    const response = NextResponse.rewrite(destinationUrl);
    response.headers.set("host", "binary-clipping.vercel.app");
    return response;
  }

  return NextResponse.next();
}

// Ensure the middleware matches these paths
export const config = {
  matcher: [
    "/podcasting/:path*",
    "/podcasting",
    "/launch-videos/:path*",
    "/launch-videos",
    "/clipping/:path*",
    "/clipping",
  ],
};
