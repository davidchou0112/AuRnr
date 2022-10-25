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
        description: 'Come explore Ballard and Seattle from this quiet spot in North Ballard! This self contained apartment has lots of natural light and a full bathroom. It is in the lower level of our house. There is one large room and a private bathroom across the hall. It is well insulated to stay cool in the summer, warm in the winter and we have a new heat pump and air conditioning. The space has all the conveniences of a hotel room. You have a private entrance, driveway thats yours to park in, fiber optic high speed wifi, microwave, toaster, electric kettle and a small frig. along with an assortment of tea, organic coffee, dishes, silverware etc. for you to use. There is a wall mounted HD T.V. with DVR and YouTube TV (equivalent to cable tv, including HBO and on demand shows)',
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
        price: 4999
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
        description: '3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128481117450284102701938521105559644622948954930381964428810975665933446128475648233786783165271201909145648566923460348610454326648213393607260249141273724587006606315588174881520920962829254091715364367892590360011330530548820466521384146951941511609433057270365759591953092186117381932611793105118548074462379962749567351885752724891227938183011949129833673362440656643086021394946395224737190702179860943702770539217176293176752384674818467669405132000568127145263560827785771342757789609173637178721468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771309960518707211349999998372978049951059731732816096318595024459455346908302642522308253344685035261931188171010003137838752886587533208381420617177669147303598253490428755468731159562863882353787593751957781857780532171226806613001927876611195909216420198938095257201065485863278865936153381827968230301952035301852968995773622599413891249721775283479131515574857242454150695950829533116861727855889075098381754637464939319255060400927701671139009848824012858361603563707660104710181942955596198946767837449448255379774726847104047534646208046684259069491293313677028989152104752162056966024058038150193511253382430035587640247496473263914199272604269922796782354781636009341721641219924586315030286182974555706749838505494588586926995690927210797509302955321165344987202755960236480665499119881834797753566369807426542527862551818417574672890977772793800081647060016145249192173217214772350141441973568548161361157352552133475741849468438523323907394143334547762416862',
        price: 4999
      },
      {
        ownerId: 2,
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
        ownerId: 2,
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
        ownerId: 3,
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
        ownerId: 3,
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
        ownerId: 3,
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
        ownerId: 3,
        address: '455 Union St',
        city: 'Arcata',
        state: 'California',
        country: 'United States of America',
        lat: 38.54,
        lng: 48.35,
        name: 'Humboldt Grown',
        description: 'Grass is greener on this side',
        price: 4999
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
