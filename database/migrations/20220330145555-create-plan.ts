module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Plans', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      billingCycle: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      // subscriptionId: {
      //   type: Sequelize.STRING,
      //   references: {
      //     model: {
      //       tableName: 'Subscriptions',
      //     },
      //     key: 'id',
      //   },
      // },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Plans');
  },
};
