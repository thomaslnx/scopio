import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';
import Subscription from './subscription'

interface CustomerAttributes {
  id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

class Customer extends Model<CustomerAttributes> {
  declare id: string;

  declare first_name: string;

  declare last_name: string;

  declare role: string;

  declare email: string;

  declare created_at: Date;

  declare updated_at: Date;

  declare deleted_at: Date;
}

Customer.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deleted_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: 'Costumers',
    sequelize,
  }
);

Customer.hasMany(Subscription, {
  sourceKey: 'subscriptionId',
  foreignKey: 'id',
  as: 'customers_subscriptions'
});

export default Customer;