'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 7,
        userId: 1,
        review: 'noiceeeee',
        stars: 4
      },
      {
        spotId: 2,
        userId: 2,
        review: 'A great get away for the family',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'I was on cloud nine, literally',
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'II was on cloud nine, literallyI was on cloud nine, literallyI was on cloud nine, literally was on cloud nine, literally',
        stars: 2
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Reviews', null, {})
  }
};
