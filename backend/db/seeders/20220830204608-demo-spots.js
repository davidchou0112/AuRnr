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
    await queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: '123 Disney Lane',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 37.7645358,
        lng: -122.4730327,
        name: 'App Academy',
        description: 'Place where web developers are created',
        price: 69
      },
      {
        ownerId: 2,
        address: '149 Diamond Street',
        city: 'Arcadia',
        state: 'California',
        country: 'United States of America',
        lat: 35.25,
        lng: 14.42,
        name: 'House of Diamonds',
        description: 'Bling Bling Bling',
        price: 99999
      },
      {
        ownerId: 3,
        address: '455 Union St',
        city: 'Arcata',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Humboldt Grown',
        description: 'Grass is greener on this side',
        price: 420
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
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
