import { User } from "@prisma/client";
import { hash } from "bcryptjs";
import { GraphQLContext } from "../..";

const resolvers = {
  Query: {
    searchUsers: () => {}
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