import { Sequelize, Dialect, Model, DataTypes } from 'sequelize'

import config from '../../config/database';

const { database, dialect, host, password, username } = config;

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect: dialect as Dialect,
});
interface PaymentGatewayAttributes {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

class PaymentGateway extends Model<PaymentGatewayAttributes> {
  declare id: string;

  declare name: string;

  declare createdAt: Date;

  declare updatedAt: Date;
}

PaymentGateway.init(
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
    tableName: 'payment_gateways',
    sequelize,
  }
);

export default PaymentGateway;
