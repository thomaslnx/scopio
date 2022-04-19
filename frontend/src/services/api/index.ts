import { ApolloClient, InMemoryCache } from '@apollo/client';
import mutations from '../../mutations/customers';

const { CREATE_CUSTOMER: customer } = mutations;

const client = new ApolloClient({
  uri: 'http://192.168.3.6:3000/graphql', // Conexão em casa
  // uri: 'http://192.168.20.104:3000/graphql', // Conexão UFT
  cache: new InMemoryCache(),
  typeDefs: customer,
});

export default client;