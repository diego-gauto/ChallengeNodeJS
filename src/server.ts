import express from "express";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { BookResolver } from "./resolvers/book.resolver";
import { AuthorResolver } from "./resolvers/author.resolver";
import { AuthResolver } from "./resolvers/auth.resolver";
import { registerCheckBooks, registerAdminReport } from "./events/handler";

export async function startServer() {
  const app = express();
  const apolloserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [BookResolver, AuthorResolver, AuthResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloserver.start();

  apolloserver.applyMiddleware({ app, path: "/graphql" });

  registerAdminReport();
  registerCheckBooks();

  return app;
}
