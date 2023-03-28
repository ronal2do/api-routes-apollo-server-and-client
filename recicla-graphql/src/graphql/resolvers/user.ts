import { User } from "@prisma/client";
import { ApolloError } from "apollo-server-express";
import { hash } from "bcryptjs";
import { GraphQLContext } from "../..";

const resolvers = {
  Query: {
    user: async (
      _: any, 
      args: { id: string }, 
      context: GraphQLContext
    ): Promise<User> => {
      const { id } = args;
      const { session, prisma } = context;

      try {
        const user = await prisma.user.findFirst({
          where: {
            id: {
              equals: id,
            }
          }
        })

        if (!user) {
          throw new ApolloError("User not found")
        }

        return user;
      } catch (error) {
        console.log('search users ewrror', error)
        throw new ApolloError(error?.message)
      }

    },
    // user(id: String!): User 
    searchUsers: async (
      _: any, 
      args: { name: string }, 
      context: GraphQLContext
    ): Promise<Array<Partial<User>>> => {
      
      const { name } = args;
      const { session, prisma } = context;
      console.log('SESSION', session)
      // if (!session?.user) {
      //   throw new ApolloError("Not Authorized")
      // }

      // const { user: { name: myName } } = session;

      try {
        const users = await prisma.user.findMany({
          where: {
            name: {
              contains: name,
              // not: myName,
              mode: 'insensitive'
            }
          }
        })

        return users;
      } catch (error) {
        console.log('search users ewrror', error)
        throw new ApolloError(error?.message)
      }

    },
    // me: (_: any,  args: any,  context: GraphQLContext ) => {
    //   console.log('me', context)
    //   // return contextValue.dataSources.userApi.findUser(contextValue.token);
    // },
  },
  Mutation: {
    registerUserWithEmail: async (
      _: any, 
      args: { email: string, name: string, password: string }, 
      context: GraphQLContext
    ): Promise<{ user?: User, success?: boolean, error: string | null }> => {
      const { email, name, password } = args;
      const { session, prisma } = context;

      try {
        const existingEmail = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (existingEmail) {
          return {
            error: "emal elaready registered"
          }
        }

        const hashedPassword = await hash(password, 8)
    
        const user = await prisma.user.create({
          data: {
            email,
            name,
            hashedPassword,
            image: '',
            emailVerified: new Date()
          }
        })
        
        return {
          user,
          success: true,
          error: null
        }

      } catch (error: any) {
        console.log("nerwsletter errror", error)
        return {
          error: error?.message,
          success: false
        }
      }
    }
  },
}

export default resolvers