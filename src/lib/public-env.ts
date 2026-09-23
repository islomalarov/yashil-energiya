// NEXT_PUBLIC_* values must be referenced literally so Next can inline them.
const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!sanityProjectId) {
  throw new Error(
    "Missing required public environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
  );
}

if (!sanityDataset) {
  throw new Error(
    "Missing required public environment variable: NEXT_PUBLIC_SANITY_DATASET",
  );
}

export const publicEnv = {
  sanityProjectId,
  sanityDataset,
};
