import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import App from "./App";
import client from "./apollo";

// every component now has access to the apollo client
// Apollo client gives us everything we need to be able to send requests from our react components
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
