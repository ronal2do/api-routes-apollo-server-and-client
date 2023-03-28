import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { createServer } from "http";
import { getSession } from "next-auth/react";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import * as dotenv from "dotenv";
import cors from "cors";
import { json } from "body-parser";
import { prisma } from './lib/prisma'
import { PrismaClient, User } from "@prisma/client";

export interface Session {
  user?: Partial<User>;
}

export interface GraphQLContext {
  session: Session | null;
  prisma: PrismaClient;
}

const main = async () => {
  dotenv.config();
  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);


  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
  });
  await server.start();

  const corsOptions = {
    origin: [ 'http://localhost:3000' ],
    credentials: true,
  };

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(corsOptions),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = await getSession({ req });

        return { session: session as Session, prisma };
      },
    })
  );

  // server.applyMiddleware({ app, path: "/graphql", cors: corsOptions });

  const PORT = 4000;

  // Now that our HTTP server is fully set up, we can listen to it.
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
};

main().catch((err) => console.log(err));