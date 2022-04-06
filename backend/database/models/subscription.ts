import { Sequelize, Dialect,DataTypes, Model } from 'sequelize';

import Customer from './customer';
import PaymentGateway from './paymentgateway';
import Plan from './plan';

import config from '../../config/database';

const { database, dialect, host, password, username } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as Dialect,
});
interface SubscriptionAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  endsAt: Date;
  deletedAt: Date;
  customerId: string;
  planId: string;
  paymentGatewayId: string;
}

type SubscriptionInputAttribues = Omit<SubscriptionAttributes, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>

class Subscription extends Model<SubscriptionAttributes | SubscriptionInputAttribues> {
  declare id: string;

  declare endsAt: Date;

  declare createdAt: Date;

  declare updatedAt: Date;

  declare deletedAt: Date;

  declare customerId: string;

  declare planId: string;

  declare paymentGateway: string;
}

Subscription.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    endsAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    customerId: {
      type: DataTypes.UUID,
      references: {
        model: Customer,
        key: 'id',
      },
    },
    planId: {
      type: DataTypes.UUID,
      references: {
        model: Plan,
        key: 'id'
      },
    },
    paymentGatewayId: {
      type: DataTypes.UUID,
      references: {
        model: PaymentGateway,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
    tableName: 'subscriptions',
    sequelize,
  }
);

Customer.hasMany(Subscription, { foreignKey: 'customerId' })
Plan.hasMany(Subscription, { foreignKey: 'planId' })
PaymentGateway.hasMany(Subscription, { foreignKey: 'paymentGatewayId' })

Subscription.belongsTo(Customer, {
  targetKey: 'id',
  foreignKey: 'customerId',
  as: 'customer',
})
Subscription.belongsTo(Plan, {
  targetKey: 'id',
  foreignKey: 'planId',
  as: 'plans',
})
Subscription.belongsTo(PaymentGateway, {
  targetKey: 'id',
  as: 'payment_gateway',
})

export default Subscription;
