import { publicEnv } from "@/lib/public-env";

export const fetchData = async <T>(
  query: string,
  variables?: Record<string, unknown>,
) => {
  const response = await fetch(publicEnv.hygraphEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: 300,
    },
  } as RequestInit & { next: { revalidate: number } });

  if (!response.ok) {
    throw new Error(`GraphQL request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: { message?: string }[];
  };

  if (payload.errors?.length) {
    throw new Error(
      payload.errors.map((error) => error.message).join("; ") ||
        "GraphQL request failed",
    );
  }

  if (!payload.data) {
    throw new Error("GraphQL response did not include data");
  }

  return payload.data;
};
