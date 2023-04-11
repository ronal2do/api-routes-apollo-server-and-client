import { getClient } from "../lib/client";

export async function useServerQuery(query: any) {
  const client = getClient();
  const { data, loading, error } = await client.query({ 
    query,
    context: {
      fetchOptions: {
        next: { revalidate: 5 },
      },
    },
  });

  return {
    data, 
    loading, 
    error
  }
}