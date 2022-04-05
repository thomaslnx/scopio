import { Op } from 'sequelize'

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
interface CreatCustomerInput {
  input: {
    firstName: string;
    lastName: string;
    role: string;
    email: string
  }
}
interface UpdateCustomerInput {
  input: {
    id: string;
    firstName?: string;
    lastName?: string;
    role?: string;
    email?: string
  }
}
interface DeleteCustomerInput {
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

    async createCustomer(_: any, { input }: CreatCustomerInput) {
      const { firstName, lastName, role, email } = input;

      const customerExist = await Customer.findOne({
        where: {
          [Op.and]: [
            { firstName: firstName},
            { lastName: lastName},
          ]
        }
      });

      if (customerExist) {
        throw new Error('This customer already exist on database!');
      }

      return Customer.create({
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
      })
    },

    async updateCustomer(_: any, { input }: UpdateCustomerInput) {
      const { id, firstName, lastName, role, email } = input;

      const customerExist = await Customer.findByPk(id);

      if (!customerExist) {
        throw new Error('This customer does not exist!');
      }

      return customerExist.update({
        firstName: firstName,
        lastName: lastName,
        role: role,
        email: email,
      })
    },

    async deleteCustomer(_: any, { input }: DeleteCustomerInput) {
      const { id } = input;

      const customerExist = await Customer.findByPk(id);

      if(!customerExist) {
        throw new Error('this customer does not exist!');
      }

      return Customer.destroy({
        where: {
          id: id
        }
      })
    }
  }
};
