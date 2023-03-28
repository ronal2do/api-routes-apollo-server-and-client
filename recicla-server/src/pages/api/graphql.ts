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
import { getToken, JWT } from 'next-auth/jwt';

export interface Session {
  user?: Partial<User>;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  token: JWT | null
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({schema});

const secret = process.env.NEXTAUTH_SECRET

export default startServerAndCreateNextHandler(server, {
  context: async  (req: NextApiRequest, res: NextApiResponse): Promise<GraphQLContext> => {
    const session = await getServerSession(req, res, authOptions);
    const token = await getToken({ req, secret })
    return { session: session as Session, prisma, token };
  },
});