import type { NextConfig } from "next";
import { withNextVideo } from "next-video/process";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/podcasting",
        destination: "https://binary-podcasting.vercel.app/podcasting",
      },
      {
        source: "/podcasting/:path*",
        destination: "https://binary-podcasting.vercel.app/podcasting/:path*",
      },
      {
        source: "/launch-videos",
        destination: "https://binary-launch-videos.vercel.app/launch-videos",
      },
      {
        source: "/launch-videos/:path*",
        destination: "https://binary-launch-videos.vercel.app/launch-videos/:path*",
      },
      {
        source: "/clipping",
        destination: "https://binary-clipping.vercel.app/clipping",
      },
      {
        source: "/clipping/:path*",
        destination: "https://binary-clipping.vercel.app/clipping/:path*",
      },
    ];
  },
};

export default withNextVideo(nextConfig);
