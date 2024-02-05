import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./api/client.ts";
import prepareApp from "./prepareApp.ts";

const root = document.getElementById("root");
if (root) {
  prepareApp().then(() => {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Theme appearance="dark">
          <ApolloProvider client={apolloClient}>
            <App />
          </ApolloProvider>
        </Theme>
      </React.StrictMode>,
    );
  });
}
