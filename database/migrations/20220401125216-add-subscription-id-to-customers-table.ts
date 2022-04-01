module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Customers', 'subscriptionId', {
       type: Sequelize.UUID,
      }).then(() => {
        queryInterface.addConstraint('Customers', {
          fields: ['subscriptionId'],
          type: 'foreign key',
          name: 'costumer_subscription_association',
          references: {
            table: 'Subscriptions',
            field: 'id',
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
        })
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Customers', 'costumer_subscription_association').then(() => {
       queryInterface.removeColumn('Customers', 'subscriptionId', {
         type: Sequelize.UUID,
       })
     });
  }
};
