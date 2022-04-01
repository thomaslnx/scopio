module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Subscriptions', 'customer', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('Subscriptions', {
         fields: ['customer'],
         type: 'foreign key',
         name: 'subscription_customer_association',
         references: {
           table: 'Customers',
           field: 'id',
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       })
     });
     await queryInterface.addColumn('Subscriptions', 'plan', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('Subscriptions', {
         fields: ['plan'],
         type: 'foreign key',
         name: 'subscription_plan_association',
         references: {
           table: 'Plans',
           field: 'id',
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       })
     });
     await queryInterface.addColumn('Subscriptions', 'paymentGateway', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('Subscriptions', {
         fields: ['paymentGateway'],
         type: 'foreign key',
         name: 'subscription_payment_gateway_association',
         references: {
           table: 'PaymentGateways',
           field: 'id',
         },
         onDelete: 'CASCADE',
         onUpdate: 'CASCADE',
       })
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Subscriptions', 'subscription_customer_association').then(() => {
      queryInterface.removeColumn('Subscriptions', 'customer', {
        type: Sequelize.UUID,
      })
    });
    await queryInterface.removeConstraint('Subscriptions', 'subscription_plan_association').then(() => {
      queryInterface.removeColumn('Subscriptions', 'plan', {
        type: Sequelize.UUID,
      })
    });
    await queryInterface.removeConstraint('Subscriptions', 'subscription_payment_gateway_association').then(() => {
      queryInterface.removeColumn('Subscriptions', 'paymentGateway', {
        type: Sequelize.UUID,
      })
    });
  }
};
