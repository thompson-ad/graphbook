import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";

// we pass link and cache parameters to apollo client
// Apollo link takes in the error link and the http link
//
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
        if (networkError) {
          console.log(`[Network error]: ${networkError}`);
        }
      }
    }),
    new HttpLink({
      uri: "http://localhost:8000/graphql"
    })
  ]),
  cache: new InMemoryCache()
});

client
  .query({
    // the gql tag parses the template literal through a abstract syntax tree. These are the first step of GraphQL
    // they are used to evaluate deeply nested objects, the schema and the query
    query: gql`
      {
        posts {
          id
          text
          user {
            avatar
            username
          }
        }
      }
    `
  })
  .then(result => console.log(result));

// export the initialised client
export default client;
