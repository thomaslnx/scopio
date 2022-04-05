import Plan from '../../database/models/plan';
import Customer from '../../database/models/customer';
import Subscription from '../../database/models/subscription';
import PaymentGateway from '../../database/models/paymentgateway';

interface PlanInputAttributes {
  input: {
    name: string;
    billingCycle: number;
    price: number
  }
}

interface PlanInputUpdate {
  input: {
    id: string;
    name?: string;
    billingCycle?: number;
    price?: number;
  }
}

interface DeletePlanInput {
  input: {
    id: string;
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
    },

    async updatePlan(_: any, { input }: PlanInputUpdate) {

      const { id, name, billingCycle, price } = input;

      const planExist = await Plan.findByPk(id);

      if(!planExist) {
        throw new Error('this plan does not exist!')
      }

      return planExist.update({
        name,
        billingCycle,
        price
      })
    },

    async deletePlan(_: any, { input }: DeletePlanInput) {
      const { id } = input;

      const planExist = await Plan.findByPk(id);

      if(!planExist) {
        throw new Error('this plan does not exist!');
      }

      return Plan.destroy({
        where: {
          id: id
        }
      })
    },
  }
};
