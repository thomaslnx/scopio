import Plan from '../../../database/models/plan';
import Customer from '../../../database/models/customer';
import Subscription from '../../../database/models/subscription';
import PaymentGateway from '../../../database/models/paymentgateway';

interface PlanInputAttributes {
  input: {
    name: string;
    billingCycle: number;
    price: number
  }
}

export const resolvers = {
  Query: {
    async plans() {
      const search = await Plan.findAll();
      return search;
    },

    async customers() {
      const search = await Customer.findAll()
      return search;
    },

    async subscriptions() {
      const search = await Subscription.findAll();
      return search;
    },

    async paymentGateway() {
      const search = await PaymentGateway.findAll()
      return search;
    }
  },

  Mutation: {
    async createPlan(_: any, { input }: PlanInputAttributes) {

      const {billingCycle, name, price} = input

      console.log('valor de input: ', billingCycle, name, price)
      const planExist = await Plan.findOne({
        where: {
          name: name
        }
      })

      if (planExist) {
        throw new Error('This plan already exist!')
      }

      return Plan.create({
          name: name,
          billingCycle: billingCycle,
          price: price,
        })
    }
  }
};
