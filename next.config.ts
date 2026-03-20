import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "example.com",
        port: "",        
        pathname: "/**"  
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**"
      },
    ],
  },
};

export default nextConfig;