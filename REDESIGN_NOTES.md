# Redesign notes — EV Charging Stations page (`/[locale]/chargingstation`)

## 1. Reconnaissance results

**Stack**
- Next.js 16 (App Router), React 19, `next-intl@4` for i18n (locales `en`, `ru`, `uz`).
- Styling: SCSS Modules (`sass`), design tokens in `src/scss/_vars.scss`.
- Icons: `lucide-react` (already a dependency — reused, no new packages).
- CMS: Hygraph (GraphCMS), assets on `us-west-2.graphassets.com`. Image optimization via `next/image`.
- Maps: Leaflet + `react-leaflet` + markercluster already in the project.

**Design tokens (`src/scss/_vars.scss`)**
- `$primaryColor: #12903e` (brand green), `$secondaryColor: #5cb63f`, `$whiteColor`, `$blackColor: #2b2b2b`.
- Breakpoints: `$sm: 640px`, `$md: 768px`, `$lg: 1024px`.
- No new colors were introduced. The page adds a local EV-blue accent CSS var (`--ev-blue: #147f8b`) that is **already used** on the micro-hydro page — it is not a new brand color.

**Reference pattern**
- The page was rebuilt to match the two most recent premium redesigns: `solarpanels` and `microges`
  (`SolarPanelsClient.tsx` / `MicroGesClient.tsx` + their `page.module.scss`). Same hero-with-breadcrumbs
  pattern, metric cards, icon-card benefit grid, horizontal steppers, map card, and green CTA panel.

**Data source — stations**
- EV stations already come from Hygraph via `EvChargeService.getEvCharges()` (`services/operational-assets.service.ts`).
- Shape: `{ id, region, regionName, name, coords: [lat,lng], condition, capacity }`.
  `condition ∈ {running, construction, commissioning}`, `capacity` in kW.
- **Variant A** of the TZ applies (CMS has data): the network section renders real station cards + the existing
  Leaflet map (`TheChSMap`). Metric numbers (station count, regions covered, total kW) are **derived from CMS
  data**, not invented. If the CMS returns zero stations, an empty state + "3+ regions" fallback is shown.

**Reused components (nothing new added to global scope)**
- `TheChSMap` (Leaflet map, unchanged).
- `ChargingGuide` (existing 7-step "how to charge" component that references the real customer app
  `app.yashil-energiya.uz`) — reused for the "How to charge" section. It already emits `schema.org/HowTo` markup.
- `TheFeedback` (standard contacts + feedback block) kept at the bottom, as required.
- `TheJsonLd` for structured data.

**SEO pattern**
- `createStaticMetadata(locale, "chargingstation")` in `layout.tsx` (title/description/canonical/hreflang) — unchanged.
- `staticPageJsonLd` (WebPage + BreadcrumbList) — unchanged.
- **Added**: `FAQPage` JSON-LD, built server-side in `layout.tsx` from the localized FAQ strings.

## 1.1. Follow-up changes (client feedback, 2026-07-16)

- Launch-year metric changed to **2025**; description generalized (no region list — stations also
  operate in Tashkent city/region per CMS data).
- Station cards: **pagination** added (6 per page, reuses `ThePaginationControls` in client mode)
  and cards are now **clickable** — a click scrolls to the map and focuses/opens the station popup
  (`TheChSMap` got an `onReady` → `focusStation(id)` control API and is memoized so pagination
  doesn't recreate the Leaflet map).
- FAQ "Will the network expand?" rewritten in general terms without naming specific regions.
- **Feedback form disabled** on this page: `TheFeedback` replaced with a contacts-only block
  (`TheContacts`); header/footer untouched, other pages unaffected.
- "Step 4 image not loading": diagnosed as a poisoned in-flight image-optimizer cache entry in the
  long-running dev server (only the `step-4-wide.webp + w=828 + AVIF` key hung; the file itself and
  sharp AVIF encoding are fine). Fixed by restarting the dev server — no code change needed and
  production is unaffected.

## 2. What changed

- `src/app/[locale]/chargingstation/ChargingStationClient.tsx` — full rewrite (hero, stats, benefits,
  network, charging types, how-to, offer CTA, FAQ accordion, partner CTA, contacts block).
- `src/app/[locale]/chargingstation/page.module.scss` — full rewrite on existing tokens.
- `src/app/[locale]/chargingstation/layout.tsx` — added localized `FAQPage` JSON-LD.
- `messages/{en,ru,uz}.json` — `ChargingStationPage` section rewritten & expanded (all three locales).
  Machine-translated English of the old copy ("the air harmful gases", "recharge stations") was rewritten.
- The public offer link (`/[locale]/chargingstation/public-offer`) is **preserved** (offer CTA section).
- Header, footer, global layouts and other pages were **not** touched.

## 3. TODO for the client (data we must not invent)

- [ ] **Connector types & power specs.** The AC vs DC comparison uses market-typical values for Uzbekistan
      (GB/T as the primary standard, CCS2 for DC). Confirm the real connector standards, per-station connector
      counts and power ratings. Marked with `TODO` in `ChargingStationClient.tsx` (`chargingTypes.note`).
- [ ] **Tariffs.** No pricing was invented. The tariff slot is intentionally a CTA to the public offer.
      If per-kWh AC/DC tariffs become available (CMS or public offer), add a simple tariff table.
- [ ] **Hero image.** Currently `public/aboutPage/about-ev-charging.webp`. Replace with a dedicated
      high-resolution EV-station/charging hero if a better asset is provided.
- [ ] **Stats strip.** Station count / regions / total kW are pulled live from Hygraph. "Connectors installed"
      was intentionally **omitted** (not in the CMS) and replaced by the confirmed launch-year (2026) metric.
      If the client wants a connector-count metric, add a `connectors` field to the EV model (see §4).

## 4. Proposed CMS model extension (optional, for later)

The `evCharge` Hygraph model currently exposes `regionName, region, name, coords, condition, capacity`.
To power richer station cards / tariffs without frontend rework, consider adding:

- `connectorCount` (Int) — number of connectors at the station.
- `connectorTypes` ([Enum/String]) — e.g. `["GBT_DC", "CCS2", "TYPE2"]`.
- `acPowerKw` / `dcPowerKw` (Float) — split power ratings.
- `tariffAc` / `tariffDc` (Float, sum per kWh) — if pricing is published.
- `photo` (Asset) — station photo for the card (currently cards use a themed gradient placeholder).

The frontend already reads stations from an array, so switching these fields on is additive — no UI rewrite needed.
