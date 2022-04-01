import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';
import Subscription from './subscription';

interface PlanAttributes {
  id: string;
  name: string;
  billingCycle: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

class Plan extends Model<PlanAttributes> {
  declare id: string;

  declare name: string;

  declare billingCycle: number;

  declare price: number;

  declare createdAt: Date;

  declare updatedAt: Date;
}

Plan.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    billingCycle: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: 'plans',
    sequelize,
  }
);

Plan.hasMany(Subscription, {
  sourceKey: 'subscriptionId',
  foreignKey: 'id',
  as: 'plans_subscriptions'
})

export default Plan;
