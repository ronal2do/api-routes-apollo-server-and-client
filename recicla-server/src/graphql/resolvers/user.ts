import { ApolloError } from "@apollo/client";
import { User } from "@prisma/client";
import { compareSync, hash } from "bcryptjs";
import { generateToken, getUser } from "../../lib/auth";
import { getRules, Rules } from "../../lib/game";
import { GraphQLContext } from "../../pages/api/graphql";

const resolvers = {
  Query: {
    me: async (
      _: any, 
      __: any, 
      context: GraphQLContext
    ): Promise<Partial<User>> => {      
      const { prisma, token } = context;

      if (!token) {
        throw new Error("Not Authorized")
      }
      
      try {
        const found = await getUser(token as string)

        if (!found) {
          throw new Error("User not found token on profile")
        }

        console.log('-== user found', found)

        const user = await prisma.user.findFirst({
          where: {
            id: found.id
          },
          include: {
            accounts: true,
            coupons: true
          }
        })

        if (!user) {
          throw new Error("Invalid token on profile")
        }

        return user;
      } catch (error) {
        console.log('search users ewrror', error)
        throw new ApolloError(error?.message)
      }

    },
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
          },
        })

        if (!user) {
          throw new Error("User not found")
        }

        return user;
      } catch (error) {
        console.log('search users ewrror', error)
        throw new ApolloError(error?.message)
      }

    },
    searchUsers: async (
      _: any, 
      args: { name: string }, 
      context: GraphQLContext
    ): Promise<Array<Partial<User>>> => {
      
      const { name } = args;
      const { session, prisma, token } = context;
      console.log('SESSION', session, token)
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
  },
  Mutation: {
    registerUserWithEmail: async (
      _: any, 
      args: { email: string, name: string, password: string }, 
      context: GraphQLContext
    ): Promise<{ user?: User, success?: boolean, error?: string, token?: string }> => {
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
          token: generateToken(user.id)
        }

      } catch (error: any) {
        console.log("nerwsletter errror", error)
        return {
          error: error?.message,
          success: false
        }
      }
    },
    loginUserWithEmail: async (
      _: any, 
      args: { email: string, password: string }, 
      context: GraphQLContext
    ): Promise<{ user?: User, success?: boolean, error?: string, token?: string }> => {
      const { email, password } = args;
      const { prisma } = context;
      let user;
      try {
        user = await prisma.user.findUnique({
          where: {
            email
          }
        })

        if (!user) {
          return {
            error: "email invalido"
          }
        }

        if (!user.hashedPassword) {
          const hashedPassword = await hash(password, 8)
          user = await prisma.user.update({
            where: {
              email
            },
            data: {
              hashedPassword
            }
          })
        } else {
          const checkPassword = compareSync(password, user.hashedPassword as string)

          if(!checkPassword) return {
            error: "invalid password"
          }
        }
          
        return {
          user,
          success: true,
          token: generateToken(user.id)
        }

      } catch (error: any) {
        console.log("nerwsletter errror", error)
        return {
          error: error?.message,
          success: false
        }
      }
    },
    addPointsToUser: async (
      _: any, 
      args: { id: string, action: Rules }, 
      context: GraphQLContext
    ): Promise<{ success?: boolean, error?: string }> => {
      const { id, action } = args;
      const { prisma, token } = context;
      const points = getRules(action)
     // verify token + user
      try {
        const user = await prisma.user.findUnique({
          where: {
            id
          }
        })

        if (!user) {
          return {
            error: "user invalido"
          }
        }

        if (!user.points) {
          user.points = 0
        }

        await prisma.user.update({
          where: {
            id
          },
          data: {
            points: user.points + points
          }
        })
 
        return {
          success: true,
        }

      } catch (error: any) {
        console.log("nerwsletter errror", error)
        return {
          error: error?.message,
          success: false
        }
      }
    },
  },
}

export default resolvers