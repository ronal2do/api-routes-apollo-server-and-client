import { connectionFromArray } from "@/lib/connection";
import { GraphQLContext } from "@/pages/api/graphql";

function createRelayData(data: any, args: any) {
  let first = 5;

  if (args.first !== undefined) {
    const min_value = 1;
    const max_value = 25;
    if (args.first < min_value || args.first > max_value) {
      throw new Error(
        `Invalid limit value (min value: ${min_value}, max: ${max_value})`
      );
    }
    first = args.first;
  }
  // initialise cursor
  let after = 0;
  if (args.after !== undefined) {
    const index = data.findIndex((item: any) => item.id === args.after);
    if (index === -1) {
      throw new Error(`Invalid after value: cursor not found.`);
    }
    after = index + 1;
    if (after === data.length) {
      throw new Error(
        `Invalid after value: no items after provided cursor.`
      );
    }
  }

  const entities = data.slice(after, after + first);
  const last = entities[entities.length - 1];

  return {
    count: data.length,
    pageInfo: {
      endCursor: last.id,
      hasNextPage: after + first < data.length,
    },
    edges: entities.map((entity: any) => ({
      cursor: entity.id,
      node: entity,
    })),
  };
}

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
  Query: {
    newsletters: async (_: any, args: any, context: GraphQLContext) => {
      const { prisma, session } = context;
      const data = await prisma.newsletter.findMany()
      const convert = connectionFromArray(data, args)
      return convert
    },
  },
}

export default resolvers