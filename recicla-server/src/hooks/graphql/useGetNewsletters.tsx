import { ApolloError, useQuery } from "@apollo/client";
import { Newsletter } from "@prisma/client";
import NewsletterOperations from "../../graphql/operations/newsletter";

interface INewsletterInput {}

interface Edge {
  cursor: string;
  node: Newsletter;
}

interface INewsletterData {
  newsletters: {
    count: number;
    edges: [Edge]
    pageInfo: {
      endCursor: string;
      hasNextPage: string;
    }
  }
}

interface IuseGetNewslettersPayload {
  data: INewsletterData | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useGetNewsletters = (): IuseGetNewslettersPayload => {
  const { data, loading, error } = useQuery<
    INewsletterData, 
    INewsletterInput
  >(NewsletterOperations.Queries.newsletters);

  return {
    data,
    loading,
    error
  };
}
