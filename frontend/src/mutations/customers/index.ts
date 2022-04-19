import { gql } from '@apollo/client';

const CREATE_CUSTOMER = gql`
  mutation createCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      id
      firstName
      lastName
      role
      email
    }
  }
  `;
  
const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($input: CustomerInputUpdate!) {
    updateCustomer(input: $input) {
      id
      firstName
      lastName
      role
      email
    }
  }
`;

const mutations = { CREATE_CUSTOMER, UPDATE_CUSTOMER }

export default mutations;