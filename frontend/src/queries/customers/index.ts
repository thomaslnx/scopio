import { gql } from '@apollo/client';

const CUSTOMERS_QUERY = gql`
  query {
    customers {
      id
      firstName
      lastName
      role
      email
    }
  }
`;

const PLANS_QUERY = gql`
  query {
    plans {
      id
      name
      billingCycle
      price
    }
  }
`;

const PAYMENT_GATEWAYS_QUERY = gql`
  query {
    paymentGateway {
      id
      name
    }
  }
`;

const queries = { CUSTOMERS_QUERY, PLANS_QUERY, PAYMENT_GATEWAYS_QUERY };

export default queries; 