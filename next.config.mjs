/** @type {import('next').NextConfig} */
const nextConfig = {
  // apex(bignamu.site)로 들어오면 www로 통일 — /api/chat 이 같은 origin에서만 호출되도록 함
  // (apex→www 307 후 POST가 다른 origin이 되어 HTML/CORS 이슈가 나는 경우 방지)
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "bignamu.site" }],
        destination: "https://www.bignamu.site/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
