import { ApolloError, useMutation } from "@apollo/client";
import NewsletterOperations from "@/graphql/operations/newsletter";

interface ICreateNewsletterInput {
  variables: {
    email: string
  }
}

interface ISubscribeToNewsletter {
  createNewsletterEntry: {
    success: boolean;
    error: string;
  }
}

interface SubscripbeToNewsletterInput {
  email: string
}

interface IuseCreateNewsletterPayload {
  createNewsletterEntry: (variables: ICreateNewsletterInput) => void;
  data: ISubscribeToNewsletter | null | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useCreateNewsletter = (): IuseCreateNewsletterPayload => {
  const [createNewsletterEntry, { data, loading, error }] = useMutation<
    ISubscribeToNewsletter, 
    SubscripbeToNewsletterInput
  >(NewsletterOperations.Mutations.createNewsletterEntry)
  return {
    createNewsletterEntry,
    data,
    loading,
    error
  };
}
