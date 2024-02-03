import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./api/client.ts";

const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <Theme appearance="dark">
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </Theme>
    </React.StrictMode>
  );
}
