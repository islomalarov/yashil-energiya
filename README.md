# Yashil Energiya

Corporate website for Yashil Energiya built with Next.js App Router, TypeScript, SCSS modules, `next-intl`, Sanity (content, Studio in `studio/`), Microsoft Graph email delivery, Cloudflare Turnstile, and Upstash rate limiting.

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

- Content comes from Sanity (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`) via GROQ queries in `services/`.
- Sanity Studio is a separate package: `cd studio && npm install && npm run dev` (deploy with `npm run deploy`).
- The Hygraph → Sanity migration is described in `docs/migration-hygraph-to-sanity.md`.
- Feedback form secrets are validated on the server through `src/lib/server-env.ts`.
- Supported locales are configured in `src/i18n/routing.ts`.
