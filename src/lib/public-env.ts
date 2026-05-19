const hygraphEndpoint = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT;

if (!hygraphEndpoint) {
  throw new Error(
    "Missing required public environment variable: NEXT_PUBLIC_HYGRAPH_ENDPOINT",
  );
}

export const publicEnv = {
  hygraphEndpoint,
};
