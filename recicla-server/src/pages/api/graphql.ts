import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { PrismaClient, User } from '@prisma/client';
import { makeExecutableSchema } from "@graphql-tools/schema";
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

import resolvers from "../../graphql/resolvers";
import typeDefs from "../../graphql/typeDefs";
import { prisma } from '../../lib/prisma';

export interface Session {
  user?: Partial<User>;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({schema});

export default startServerAndCreateNextHandler(server, {
  // context: async (req: NextApiRequest, res: NextApiResponse) => {({ req, res, user: await getServerSession(req, res, authOptions) })},
  context: async  (req: NextApiRequest, res: NextApiResponse): Promise<GraphQLContext> => {
    const session = await getServerSession(req, res, authOptions);

    return { session: session as Session, prisma };
  },
});