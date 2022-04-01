module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Plans', 'subscriptionId', {
      type: Sequelize.UUID,
     }).then(() => {
       queryInterface.addConstraint('Plans', {
         fields: ['subscriptionId'],
         type: 'foreign key',
         name: 'plan_subscription_association',
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
    await queryInterface.removeConstraint('Plans', 'plan_subscription_association').then(() => {
      queryInterface.removeColumn('Plans', 'subscriptionId', {
        type: Sequelize.UUID,
      })
    });
  }
};
