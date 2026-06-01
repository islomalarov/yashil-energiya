const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const isProduction = process.env.NODE_ENV === "production";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-inline'${isProduction ? "" : " 'unsafe-eval'"} https://challenges.cloudflare.com https://www.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob: https://us-west-2.graphassets.com https://*.tile.openstreetmap.org https://unpkg.com https://raw.githubusercontent.com https://cdnjs.cloudflare.com https://www.google-analytics.com https://stats.g.doubleclick.net;
      media-src 'self';
      font-src 'self' data:;
      connect-src 'self' https://challenges.cloudflare.com https://*.upstash.io https://*.hygraph.com https://*.graphcms.com https://us-west-2.graphassets.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net;
      frame-src https://challenges.cloudflare.com https://www.google.com https://maps.google.com https://yandex.ru https://yandex.com https://*.yandex.ru https://*.yandex.net;
      worker-src 'self' blob:;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      upgrade-insecure-requests;
    `
      .replace(/\s{2,}/g, " ")
      .trim(),
  },
];

const staticHtmlCacheHeaders = [
  {
    key: "Cache-Control",
    value: "public, s-maxage=3600, stale-while-revalidate=86400",
  },
];

const noIndexHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow",
  },
];

const noIndexFollowHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex, follow",
  },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "us-west-2.graphassets.com",
        port: "",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        has: [
          {
            type: "host",
            value: "app.yashil-energiya.uz",
          },
        ],
        headers: noIndexHeaders,
      },
      {
        source: "/uz/:path(news|articles|plants|vacancies)/:slug*",
        headers: noIndexFollowHeaders,
      },
      {
        source: "/",
        headers: staticHtmlCacheHeaders,
      },
      {
        source: "/:lang(en|ru|uz)",
        headers: staticHtmlCacheHeaders,
      },
      {
        source: "/:lang(en|ru|uz)/about",
        headers: staticHtmlCacheHeaders,
      },
      {
        source: "/:lang(en|ru|uz)/ceo",
        headers: staticHtmlCacheHeaders,
      },
      {
        source: "/:lang(en|ru|uz)/microges",
        headers: staticHtmlCacheHeaders,
      },
      {
        source: "/:lang(en|ru|uz)/chargingstation",
        headers: staticHtmlCacheHeaders,
      },
      {
        source: "/:lang(en|ru|uz)/contacts",
        headers: staticHtmlCacheHeaders,
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|mp4|pdf|docx)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/sitemap.txt",
        destination: "/sitemap.xml",
        statusCode: 301,
      },
      {
        source: "/:lang(en|ru|uz)/mhp",
        destination: "/:lang/microges",
        statusCode: 301,
      },
      {
        source: "/:lang(en|ru|uz)/ev",
        destination: "/:lang/chargingstation",
        statusCode: 301,
      },
      {
        source: "/:lang(en|ru|uz)/articles/page:page(\\d+)",
        destination: "/:lang/articles",
        statusCode: 301,
      },
      {
        source: "/articles/page:page(\\d+)",
        destination: "/en/articles",
        statusCode: 301,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);
