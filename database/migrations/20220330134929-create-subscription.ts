module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Subscriptions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      // costumer: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: {
      //       tableName: 'Costumer',
      //     },
      //     key: 'id',
      //   },
      // },
      // plan: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: {
      //       tableName: 'Plan',
      //     },
      //     key: 'id',
      //   },
      // },
      // paymentGateway: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: {
      //       tableName: 'PaymentGateway',
      //     },
      //     key: 'id',
      //   },
      // },
      endsAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Subscriptions');
  },
};
