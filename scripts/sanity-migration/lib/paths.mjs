import path from "node:path";
import { fileURLToPath } from "node:url";

export const MIGRATION_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

// Raw snapshots, transformed NDJSON and reports. Gitignored: contains full
// content exports that must not be committed.
export const DATA_DIR = path.join(MIGRATION_DIR, ".data");
