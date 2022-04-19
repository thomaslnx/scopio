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

const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($input: DeleteCustomerInput) {
    deleteCustomer(input: $input)
  }
`;

const mutations = { 
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER ,
  DELETE_CUSTOMER,
}

export default mutations;