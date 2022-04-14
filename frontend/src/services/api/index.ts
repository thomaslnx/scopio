import { ApolloClient, InMemoryCache } from '@apollo/client';
import mutations from '../../mutations/customers';

const { CREATE_CUSTOMER: customer } = mutations;

const client = new ApolloClient({
  uri: 'http://192.168.3.6:3000/graphql',
  cache: new InMemoryCache(),
  typeDefs: customer,
});

export default client;