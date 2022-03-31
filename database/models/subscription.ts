import { DataTypes, Model } from 'sequelize';
import { sequelize } from '.';

interface SubscriptionAttributes {
  id: string;
  created_at: Date;
  updated_at: Date;
  ends_at: Date;
  deleted_at: Date;
}

class Subscription extends Model<SubscriptionAttributes> {
  declare id: string;

  declare ends_at: Date;

  declare created_at: Date;

  declare updated_at: Date;

  declare deleted_at: Date;
}

Subscription.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    ends_at: {
      allowNull: false,
      type: DataTypes.DATE,
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
    tableName: 'Subscriptions',
    sequelize,
  }
);

export default Subscription;
