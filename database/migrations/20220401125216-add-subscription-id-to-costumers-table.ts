module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Costumers', 'subscriptionId', {
       type: Sequelize.UUID,
      }).then(() => {
        queryInterface.addConstraint('Costumers', {
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
    await queryInterface.removeConstraint('Costumers', 'costumer_subscription_association').then(() => {
       queryInterface.removeColumn('Costumers', 'subscriptionId', {
         type: Sequelize.UUID,
       })
     });
  }
};
