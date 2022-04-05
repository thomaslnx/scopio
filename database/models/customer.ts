import  { Sequelize, Dialect } from 'sequelize';
import { Model, DataTypes } from 'sequelize';

import config from '../../config/database';

const { database, dialect, host, password, username } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as Dialect,
});
interface CustomerAttributes {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

class Customer extends Model<CustomerAttributes> {
  declare ed: string;

  declare firstName: string;

  declare lastName: string;

  declare role: string;

  declare email: string;

  declare createdAt: Date;

  declare updatedAt: Date;

  declare deletedAt: Date;
}

Customer.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
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
  },
  {
    timestamps: true,
    tableName: 'customers',
    sequelize,
  }
);

export default Customer;
