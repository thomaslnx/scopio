import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Plan {
    id: ID
    name: String!
    billingCycle: Int
    price: Float
  }

  input PlanInput {
    name: String!
    billingCycle: Int!
    price: Float!
  }

  input PlanUpdateInput {
    id: ID!
    name: String
    billingCycle: Int
    price: Float
  }

  input DeletePlanInput {
    id: ID!
  }

  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    role: String!
    email: String!
  }

  input CustomerInput {
    firstName: String!
    lastName: String!
    role: String!
    email: String!
  }

  input CustomerInputUpdate {
    id: ID!
    firstName: String
    lastName: String
    role: String
    email: String
  }

  input DeleteCustomerInput {
    id: ID!
  }

  type Subscription {
    id: ID!
    customerId: [Customer!]
    planId: [Plan!]
    paymentGatewayId: [PaymentGateway!]
    endsAt: String!
  }

  type PaymentGateway {
    id: ID!
    name: String!
  }

  type Query {
    plans: [Plan]
    customers: [Customer]
    subscriptions: [Subscription]
    paymentGateway: [PaymentGateway]
  }

  type Mutation {
    createPlan(input: PlanInput!): Plan
    updatePlan(input: PlanUpdateInput!): Plan
    deletePlan(input: DeletePlanInput): Boolean

    createCustomer(input: CustomerInput!): Customer
    updateCustomer(input: CustomerInputUpdate!): Customer
    deleteCustomer(input: DeleteCustomerInput): Boolean
  }
`;
