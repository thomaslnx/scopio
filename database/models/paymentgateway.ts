import { Model, DataTypes } from 'sequelize';
import { sequelize } from '.';

interface PaymentGatewayAttributes {
  id: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}

class PaymentGateway extends Model<PaymentGatewayAttributes> {
  declare id: string;

  declare name: string;

  declare created_at: Date;

  declare updated_at: Date;
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
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: true,
    tableName: 'PaymentGateways',
    sequelize,
  }
);

export default PaymentGateway;
