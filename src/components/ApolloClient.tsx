import { PropsWithChildren } from "react";
// import { useSelector } from "react-redux";
import { createUploadLink } from "apollo-upload-client";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
// import Cookie from 'cookie-universal'
import Cookies from "universal-cookie";

const graphqlEndpoint = `http://localhost:80/graphql`;

interface CustomApolloProviderProps {
  // Add any props type if needed
}

const CustomApolloProvider = (
  props: PropsWithChildren<CustomApolloProviderProps>
) => {
  //   const cookies = Cookie();
  const { children } = props;
  const cookies = new Cookies();
  const token = cookies.get("ut");

  const auth = token ? `ut ${token}` : null;

  console.log(token);
  const authLink = setContext((_, { headers }) => {
    // console.log(auth)
    return {
      headers: {
        ...headers,
        auth,
      },
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      // graphQLErrors.forEach(({ message, location, path }) => {
      //   // if ()
      //   console.log(`message:${message} location:${location}`);
      // });
    }

    if (networkError) {
      console.log(`networkerror: ${networkError}`);
    }
  });

  const httpLink = createUploadLink({
    uri: graphqlEndpoint,
  });

  const link = ApolloLink.from([errorLink, authLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client} {...props}>
      {children}
    </ApolloProvider>
  );
};

export default CustomApolloProvider;
