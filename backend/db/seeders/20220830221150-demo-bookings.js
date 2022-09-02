'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Bookings', [
    {
      spotId: 1,
      userId: 1,
      startDate:'2022-08-31',
      endDate: '2022-09-09'
    },
    {
      spotId: 2,
      userId: 2,
      startDate:'2022-09-29',
      endDate: '2022-10-11'
    },
    {
      spotId: 3,
      userId: 3,
      startDate:'2022-11-11',
      endDate: '2022-11-20'
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Bookings', null, {})
  }
};
