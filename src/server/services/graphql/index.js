import { ApolloServer } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import Resolvers from "./resolvers";
import Schema from "./schema";

// again, we surrounded everything here with a function that accepts the utils object
// we need access to the database within our resolvers.

export default (utils) => {
  const executableSchema = makeExecutableSchema({
    typeDefs: Schema,
    // .call makes it so that the scope of the resolvers is the utils object
    // so, within resolvers, accessing 'this' gives us utils.
    resolvers: Resolvers.call(utils),
  });

  const server = new ApolloServer({
    schema: executableSchema,
    context: ({ req }) => req,
  });

  return server;
};
