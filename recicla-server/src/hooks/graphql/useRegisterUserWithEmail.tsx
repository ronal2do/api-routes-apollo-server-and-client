import { useMutation } from "@apollo/client";
import { User } from "@prisma/client";

import UserOperations from "../../graphql/operations/user";

interface ISignUpResponse {
  registerUserWithEmail: {
    user?: User
    success: boolean;
    error: string;
  }
}

interface ISignupInput {
  email: string;
  name: string;
  password: string;
}

export const useRegisterUserWithEmail = () => {
  const [registerUserWithEmail, { data, loading, error }] = useMutation<
    ISignUpResponse, 
    ISignupInput
  >(UserOperations.Mutations.registerUserWithEmail)

  return {
    registerUserWithEmail, 
    data,
    loading,
    error
  };
}
