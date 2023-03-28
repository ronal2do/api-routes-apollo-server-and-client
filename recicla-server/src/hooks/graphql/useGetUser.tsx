import { ApolloError, useQuery } from "@apollo/client";
import { User as UserType } from "@prisma/client";

import UserOperations from "../../graphql/operations/user";

interface IUserData {
  user: UserType
}

interface IuseGetUser {
  id: string
}

interface IuseGetUserPayload {
  data: IUserData | undefined;
  loading: boolean;
  error: ApolloError | undefined;
}

export const useGetUser = (id: string): IuseGetUserPayload => {
  const { data, loading, error } = useQuery<
    IUserData, 
    IuseGetUser
  >(UserOperations.Queries.user, {
    variables: { 
      id
    }
  });

  return {
    data,
    loading,
    error
  };
}
