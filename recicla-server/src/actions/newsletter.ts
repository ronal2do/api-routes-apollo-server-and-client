import NewsletterOperations from "@/graphql/operations/newsletter";
import { useServerQuery } from "./apollo";

export async function getNewslettersList() {
  const { data, loading, error } = await useServerQuery(
    NewsletterOperations.Queries.newsletters
  );

  return {
    data, 
    loading, 
    error
  }
}