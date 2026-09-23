// Studio-side env vars must be prefixed with SANITY_STUDIO_. The project id
// is public; the defaults point at the Yashil Energiya project.
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "ljlv76fi";
export const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export const apiVersion = "2025-02-19";
