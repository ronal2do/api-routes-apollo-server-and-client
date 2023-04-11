import { getClient } from "../lib/client";

export async function useServerQuery(query: any) {
  const client = getClient();
  const { data, loading, error } = await client.query({ 
    query
  });

  return {
    data, 
    loading, 
    error
  }
}
