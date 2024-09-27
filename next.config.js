/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  // // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,
  // // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
  // // Optional: Change the output directory `out` -> `dist`
  // distDir: "dist",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "us-west-2.graphassets.com",
        port: "",
        // pathname: "/account123/**",
      },
    ],
    // loader: "custom",
    //   loaderFile: "./my/image/loader.ts",
  },
};

module.exports = nextConfig;
