import { Op } from 'sequelize';
import moment from 'moment';

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
interface CreatePaymentGatewayInput {
  input: {
    name: string;
  }
}
interface UpdatePaymentGatewayInput {
  input: {
    id: string;
    name: string;
  }
}
interface DeletePaymentGatewayInput {
  input: {
    id: string;
  }
}

interface CreateSubscriptionInput {
  input: {
    customerId: string;
    planId: string;
    paymentGatewayId: string;
    endsAt: string;
    deletedAt?: Date;
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
    },

    async createPaymentGateway(_:any, { input }: CreatePaymentGatewayInput) {
      const { name } = input;

      const paymentGatewayExist = await PaymentGateway.findOne({
        where: {
          name: name,
        }
      });

      if(paymentGatewayExist) {
        throw new Error('This payment gateway already exist!');
      }

      return PaymentGateway.create({
        name: name,
      })
    },

    async updatePaymentGateway(_:any, { input }: UpdatePaymentGatewayInput) {
      const { id, name } = input;

      const paymentGatewayExist = await PaymentGateway.findByPk(id);

      if(!paymentGatewayExist) {
        throw new Error('this payment gateway does not exist!')
      }

      return paymentGatewayExist.update({
        name,
      });
    },

    async deletePaymentGateway(_: any, { input }: DeletePaymentGatewayInput) {
      const { id } = input;

      const paymentGatewayExist = await PaymentGateway.findByPk(id);

      if(!paymentGatewayExist) {
        throw new Error('this payment gateway does not exist!');
      }

      return PaymentGateway.destroy({
        where: {
          id: id
        }
      })
    },

    async createSubscription(_: any, { input }: CreateSubscriptionInput) {
      const { customerId, paymentGatewayId, planId, endsAt } = input;

      const customerExist = await Customer.findByPk(customerId);
      const planExist = await Plan.findByPk(planId);
      const paymentGatewayExist = await PaymentGateway.findByPk(paymentGatewayId);

      const formattedDate = new Date(moment(endsAt).toISOString());

      if(!planExist) {
        throw new Error('This plan does not exist!');
      }

      if(!customerExist) {
        throw new Error('This customer does not exist!');
      }

      if(!paymentGatewayExist) {
        throw new Error('This payment gateway does not exist!');
      }

      const newSubscription = await Subscription.create({
        customerId: customerId,
        planId: planId,
        paymentGatewayId: paymentGatewayId,
        endsAt: formattedDate,
      })


      return newSubscription;
      // const newSubscriptionId = newSubscription.id;

      // const searchSubscription = await Subscription.findAll({
      //   where: {
      //     id: newSubscriptionId
      //   },
      //   include: {
      //     model: PaymentGateway,
      //     as: 'payment_gateway',
      //   },
      // })

      // console.log('valor de newSubscription: ', newSubscription);
      // console.log('valor de searchSubscription: ', searchSubscription);
    }
  }
};
