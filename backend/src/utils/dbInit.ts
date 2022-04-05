import models from '../../database/models';

const { Customer, Plan, Subscription, PaymentGateway } = models;

const dbInit = () => Promise.all([
  Customer.sync(),
  Plan.sync(),
  PaymentGateway.sync(),
  Subscription.sync()
])

export default dbInit;
