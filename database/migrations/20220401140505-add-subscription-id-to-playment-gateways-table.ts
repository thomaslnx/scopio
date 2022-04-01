'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('PaymentGateways', 'subscriptionId', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('PaymentGateways', {
         fields: ['subscriptionId'],
         type: 'foreign key',
         name: 'payment_gateway_subscription_association',
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
    await queryInterface.removeConstraint('PaymentGateways', 'payment_gateway_subscription_association').then(() => {
      queryInterface.removeColumn('PaymentGateways', 'subscriptionId', {
        type: Sequelize.UUID,
      })
    });
  }
};
