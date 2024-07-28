import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const getApolloLinks = (): string => {
  return "http://localhost:5000/graphql";
};

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user");
  return {
    headers: {
      ...Headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const getApolloClient = () =>
  new ApolloClient({
    link: from([
      authLink.concat(
        new HttpLink({
          uri: getApolloLinks(),
        })
      ),
    ]),
    cache: new InMemoryCache(),
    
  });
  root.render(
    <React.StrictMode>
      <ApolloProvider client={getApolloClient()}>
        <App />
      </ApolloProvider>
    </React.StrictMode>
  );
  
