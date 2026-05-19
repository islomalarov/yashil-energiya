# Yashil Energiya

Corporate website for Yashil Energiya built with Next.js App Router, TypeScript, SCSS modules, `next-intl`, Hygraph, Microsoft Graph email delivery, Cloudflare Turnstile, and Upstash rate limiting.

## Requirements

- Node.js compatible with Next.js 16
- npm
- Environment variables from `.env.example`

## Development

```bash
npm install
npm run dev
```

The local app runs at [http://localhost:3000](http://localhost:3000).

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Notes

- Public GraphQL access is configured through `NEXT_PUBLIC_HYGRAPH_ENDPOINT`.
- Feedback form secrets are validated on the server through `src/lib/server-env.ts`.
- Supported locales are configured in `src/i18n/routing.ts`.
