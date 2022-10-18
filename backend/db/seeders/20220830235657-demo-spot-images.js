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
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "https://thumbs.dreamstime.com/b/luxury-golden-house-isolated-brand-new-metaphor-expensive-mortgage-asset-costly-dream-home-43565715.jpg",
        preview: true
      },
      {
        spotId: 2,
        url: "https://c8.alamy.com/comp/KR8BYN/the-golden-castle-in-wat-chantharam-wat-tha-sung-at-uthai-thanithailand-KR8BYN.jpg",
        preview: true
      },
      {
        spotId: 3,
        url: "https://www.applesfromny.com/wp-content/uploads/2020/06/SnapdragonNEW.png",

        preview: true
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
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
