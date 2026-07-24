import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oxemxjxvyymejjxcubxo.supabase.co",
      },
    ],
  },
  // 🟢 ย้ายออกมาอยู่ตรงนี้ (นอก experimental)
  allowedDevOrigins: ["192.168.1.106", "localhost:3000"],
};

export default nextConfig;