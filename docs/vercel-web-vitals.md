# Vercel Web Vitals monitoring

The project uses Vercel Speed Insights and Web Analytics in the App Router root layout:

- `@vercel/speed-insights/next` collects real user LCP, INP and CLS by route.
- `@vercel/analytics/next` records page views and helps prioritize URLs with real traffic.

After production deploy, open the Vercel project and check:

1. **Speed Insights**: sort routes by the worst Core Web Vital and add failed URLs to the table below.
2. **Analytics**: compare affected routes with traffic volume before prioritizing fixes.
3. **Deployments**: compare the current production deployment with the previous one after each fix.

Targets:

| Metric | Good | Needs improvement | Poor |
| --- | --- | --- | --- |
| LCP | <= 2.5s | <= 4.0s | > 4.0s |
| INP | <= 200ms | <= 500ms | > 500ms |
| CLS | <= 0.1 | <= 0.25 | > 0.25 |

Problem URL register:

| URL | Locale | Metric | Current value | Device | Suspected cause | Status |
| --- | --- | --- | --- | --- | --- | --- |
| `/en` | en | TBD | TBD | TBD | TBD | Open |
| `/ru` | ru | TBD | TBD | TBD | TBD | Open |
| `/en/news` | en | TBD | TBD | TBD | News cards/images | Open |
| `/ru/news` | ru | TBD | TBD | TBD | News cards/images | Open |
| `/en/articles` | en | TBD | TBD | TBD | Article cards/images | Open |
| `/en/contacts` | en | TBD | TBD | TBD | Embedded map | Open |
| `/en/microges` | en | TBD | TBD | TBD | Map/visual content | Open |

Update this table with real Vercel field data after every production deployment.
