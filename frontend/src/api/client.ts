import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

const httpLink = createHttpLink({
  uri: "https://chatapp.doruksenel.xyz/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});
const onErrorLink = onError(({ operation }) => {
  const { response } = operation.getContext();
  if (
    response.status === 401 &&
    operation.operationName !== "LoginOrRegister"
  ) {
    location.reload();
  }
});

const apolloClient = new ApolloClient({
  link: from([onErrorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
export default apolloClient;
