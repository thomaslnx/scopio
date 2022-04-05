import  { Sequelize, Dialect } from 'sequelize';
import { Model, DataTypes } from 'sequelize';

import config from '../../config/database';
interface PlanAttributes {
  id: string;
  name: string;
  billingCycle: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const { database, dialect, host, password, username } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as Dialect,
});

type CreatePlanAttributes = Omit<PlanAttributes, 'id' | 'createdAt' | 'updatedAt'>

class Plan extends Model<PlanAttributes | CreatePlanAttributes> {
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
    underscored: false,
    sequelize,
  }
);

export default Plan;
