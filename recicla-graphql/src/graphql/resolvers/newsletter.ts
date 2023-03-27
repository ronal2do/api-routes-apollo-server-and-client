import { GraphQLContext } from "../..";

const resolvers = {
  Mutation: {
    createNewsletterEntry: async (
      _: any, 
      args: { email: string }, 
      context: GraphQLContext
    ): Promise<{ success?: boolean, error: string | null }> => {
      const { email } = args;
      const { session, prisma } = context;

      try {
        const existingEmail = await prisma.newsletter.findUnique({
          where: {
            email
          }
        })

        if (existingEmail) {
          return {
            error: "emal elaready registered"
          }
        }

        await prisma.newsletter.create({
          data: {
            email
          }
        })
        
        return {
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