import { ApolloClient, InMemoryCache, makeVar, createHttpLink, split, ApolloLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import { LOCALSTORAGE_TOKEN } from './constants';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

let isServer = typeof window === 'undefined'

const token = isServer ? null : localStorage.getItem(LOCALSTORAGE_TOKEN)
export const isLoggedInVar = makeVar(Boolean(token))
export const authTokenVar = makeVar(token)

const socketUrl = process.env.GRAPHQL_SOCKET_URL || ''
const httpLink = createHttpLink({ uri: process.env.GRAPHQL_SERVER })

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'x-jwt': authTokenVar() || '',
    },
  };
})

const appolloLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-jwt': authTokenVar() || '',
      // authorization: localStorage.getItem('token') || null,
    }
  }));

  return forward(operation);
})

const wsLink = isServer ? appolloLink : new WebSocketLink({
  uri: socketUrl,
  options: {
      reconnect: true,
      connectionParams: {
          'x-jwt': authTokenVar(),
      },
  },
})

const splitLink = isServer ? httpLink : split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
)

const client = new ApolloClient({
  ssrMode: isServer,
  uri: process.env.GRAPHQL_SERVER,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar()
            },
          },
        },
      },
    },
  }),
})

export default client