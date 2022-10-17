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
        url: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ef578838-1c6b-4489-b475-c5e9c68b033a/dbngtk7-896ff5b8-fbe2-42fc-899e-def4f81a5f62.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2VmNTc4ODM4LTFjNmItNDQ4OS1iNDc1LWM1ZTljNjhiMDMzYVwvZGJuZ3RrNy04OTZmZjViOC1mYmUyLTQyZmMtODk5ZS1kZWY0ZjgxYTVmNjIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.T1Y6lmDzYNAvfhr6LrQu4gE1j3S8i3HWi5LK8UJM9Hc",
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
