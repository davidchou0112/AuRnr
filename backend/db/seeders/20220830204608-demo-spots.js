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
        price: 5000
      },
      {
        ownerId: 1,
        address: '149 Diamond Street',
        city: 'Arcadia',
        state: 'California',
        country: 'United States of America',
        lat: 35.25,
        lng: 14.42,
        name: 'House of Diamonds',
        description: 'Come explore B acro haveequivalent to cable tv, including HBO and on demand shows)',
        price: 99999
      },
      {
        ownerId: 1,
        address: '455 Union St',
        city: 'Arcata',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Humboldt Grown',
        description: 'Grass is greener on this side',
        price: 4999
      },
      {
        ownerId: 1,
        address: '72 Palmer st.',
        city: 'San Demas',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Math is King',
        description: 'Pure mathematics is, in its way, the poetry of logical ideas. — Albert Einstein, German theoretical physicist  ',
        price: 629
      },
      {
        ownerId: 2,
        address: '67 Inn St',
        city: 'Sitkah',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'We Like Math Too',
        description: '3.141592653455570674983850549458858692699569092794143334547762416862',
        price: 4999
      },
      {
        ownerId: 2,
        address: '723 West St',
        city: 'Eureka',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Don Hector',
        description: 'Closest homes to the best nearshore fishing off the docks!',
        price: 499
      },
      {
        ownerId: 2,
        address: '882 E State St',
        city: 'San Francisco',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Humble Beginnings',
        description: 'The start of something new begins at this doorstep.',
        price: 599
      },
      {
        ownerId: 1,
        address: '24 Small Rd',
        city: 'Santa Fe',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Home Sweet Home',
        description: 'They say home is where the heart is!',
        price: 99
      },
      {
        ownerId: 3,
        address: '82 Welfare Dr',
        city: 'El Dorado',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'City of Gold',
        description: 'Drifting across the river and pass that waterfall... treasure lies ahead.',
        price: 199
      },
      {
        ownerId: 3,
        address: '74 S Alice St',
        city: 'Arcadia',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Sakura Falls',
        description: 'Situated in the heart of Arcadia, surrounded by the top eateries!',
        price: 89
      },
      {
        ownerId: 3,
        address: '112 First Ave',
        city: 'El Monte',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'The Great Escape',
        description: 'If you are looking to take a break from all the worries of work and life, look no further!',
        price: 149
      },
      {
        ownerId: 3,
        address: '712 San Gabriel',
        city: 'Rosemead',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Csardas Del Monte',
        description: 'A home restructed to provide the best and highest quality appliances for all your musical needs!',
        price: 99
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
    await queryInterface.bulkDelete('Spots', null, {})
  }
};
