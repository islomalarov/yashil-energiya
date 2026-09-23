// Read-only Hygraph Content API client for the migration scripts.
// AGENTS.md §9: never mutate Hygraph models or content — queries only.
import process from "node:process";
import { setTimeout as sleep } from "node:timers/promises";

export const HYGRAPH_LOCALES = ["en", "ru"];

export function getEndpoint() {
  const endpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;
  if (!endpoint) {
    throw new Error(
      "NEXT_PUBLIC_HYGRAPH_ENDPOINT is not set. Run with --env-file=.env.local",
    );
  }
  return endpoint;
}

// The free Hygraph plan rate-limits the Content API, and production shares
// that budget — so throttle every request and back off on 429/5xx.
const MIN_INTERVAL_MS = 500;
const MAX_RETRIES = 6;
let lastRequestAt = 0;

async function throttledFetch(body) {
  for (let attempt = 0; ; attempt++) {
    const wait = lastRequestAt + MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await sleep(wait);
    lastRequestAt = Date.now();

    // globalThis: the project ESLint config defines no Node globals.
    const response = await globalThis.fetch(getEndpoint(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt >= MAX_RETRIES) return response;

    const retryAfter = Number(response.headers.get("retry-after"));
    const delay =
      Number.isFinite(retryAfter) && retryAfter > 0
        ? retryAfter * 1000
        : 1000 * 2 ** attempt;
    process.stderr.write(
      `Hygraph ${response.status}, retry ${attempt + 1} in ${delay}ms\n`,
    );
    await sleep(delay);
  }
}

export async function hygraphQuery(query, variables) {
  const response = await throttledFetch(JSON.stringify({ query, variables }));

  if (!response.ok) {
    throw new Error(`Hygraph request failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join("; "));
  }
  return payload.data;
}

const PAGE_SIZE = 100;

// Pages through a plural query field until a short page is returned.
export async function fetchAll(field, selection, { locale } = {}) {
  const localeArgs = locale ? ", locales: [$locale]" : "";
  const localeVar = locale ? ", $locale: Locale!" : "";
  const query = `
    query Page($first: Int!, $skip: Int!${localeVar}) {
      items: ${field}(first: $first, skip: $skip, stage: PUBLISHED${localeArgs}) {
        ${selection}
      }
    }
  `;

  const records = [];
  for (let skip = 0; ; skip += PAGE_SIZE) {
    const data = await hygraphQuery(query, { first: PAGE_SIZE, skip, locale });
    records.push(...data.items);
    if (data.items.length < PAGE_SIZE) return records;
  }
}

export async function fetchEnumValues(name) {
  const data = await hygraphQuery(
    `query Enum($name: String!) { __type(name: $name) { enumValues { name } } }`,
    { name },
  );
  return data.__type?.enumValues?.map((v) => v.name) ?? [];
}
