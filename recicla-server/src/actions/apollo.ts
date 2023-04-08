import { useMutation, useQuery } from "@apollo/client";
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

export async function useClientQuery(query: any) {
  const client = getClient();
  const { loading, data, error } = await useQuery(query, { client });

  return {
    loading,
    data,
    error
  };
}

export async function useClientMutation<R, I>(mutation: any) {
  const client = getClient();
  const data = await useMutation<R, I>(mutation, { client });
  
  return data;
}