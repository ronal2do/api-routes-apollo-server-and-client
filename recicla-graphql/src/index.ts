import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';
import { typeDefs, resolvers } from './graphql';
import loglevel from 'loglevel';
import { makeExecutableSchema } from '@graphql-tools/schema';
import * as dotenv from 'dotenv'
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth/core/types';
import { PrismaClient } from '@prisma/client';

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
  // pubsub
}

const main = async () => {
  dotenv.config()
  const logger = loglevel.getLogger('apollo-server');
  logger.setLevel(loglevel.levels.DEBUG);

  const corsOptions = {
    origin: [process.env.CLIENT_ORIGIN]
  }

  const prisma = new PrismaClient()

  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({  
    typeDefs,
    resolvers
  })

  const server = new ApolloServer<GraphQLContext>({
    logger,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: [ 'http://localhost:3000', 'https://studio.apollographql.com' ] }),
    json(),
    expressMiddleware(server, {
      context: async ({ req, res }): Promise<GraphQLContext> => {
        const session = await getSession({ req })
        console.log("CONTEXT SESSION", session)

        return { session, prisma }
      },
    }),
  );
  
  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main().catch((err) => console.log(err));