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

  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    role: String!
    email: String!
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
  }
`;