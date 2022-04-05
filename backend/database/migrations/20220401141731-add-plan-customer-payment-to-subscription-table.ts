module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('subscriptions', 'customerId', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('subscriptions', {
         fields: ['customerId'],
         type: 'foreign key',
         name: 'subscription_customer_association',
         references: {
           table: 'customers',
           field: 'id',
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       })
     });
     await queryInterface.addColumn('subscriptions', 'planId', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('subscriptions', {
         fields: ['planId'],
         type: 'foreign key',
         name: 'subscription_plan_association',
         references: {
           table: 'plans',
           field: 'id',
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       })
     });
     await queryInterface.addColumn('subscriptions', 'paymentGatewayId', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('subscriptions', {
         fields: ['paymentGatewayId'],
         type: 'foreign key',
         name: 'subscription_payment_gateway_association',
         references: {
           table: 'payment_gateways',
           field: 'id',

         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       })
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('subscriptions', 'subscription_customer_association').then(() => {
      queryInterface.removeColumn('subscriptions', 'customerId', {
        type: Sequelize.UUID,
      })
    });
    await queryInterface.removeConstraint('subscriptions', 'subscription_plan_association').then(() => {
      queryInterface.removeColumn('subscriptions', 'planId', {
        type: Sequelize.UUID,
      })
    });
    await queryInterface.removeConstraint('subscriptions', 'subscription_payment_gateway_association').then(() => {
      queryInterface.removeColumn('subscriptions', 'paymentGatewayId', {
        type: Sequelize.UUID,
      })
    });
  }
};
